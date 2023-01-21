import pyaudio
from rev_ai.models import MediaConfig
from rev_ai.streamingclient import RevAiStreamingClient
import six
import json
import firebase_admin
from firebase_admin import firestore, credentials
import datetime
from co import categorize_string
import math
import pprint


# Use a service account.
cred = credentials.Certificate(
    '/Users/aakash/Documents/Hacks/hear-me/APIKey/hearmeAPIKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


def combineText(response):
    msg = ''
    for word in response['elements']:
        msg += word['value']

    return msg


def fethcAllText():
    list_msgObj = []
    docs = db.collection('announcements').get()
    for doc in docs:
        list_msgObj.append(doc.to_dict())

    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(list_msgObj)
    return list_msgObj


fethcAllText()


class MicrophoneStream(object):

    """Opens a recording stream as a generator yielding the audio chunks."""

    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk
        # Create a thread-safe buffer of audio data
        self._buff = six.moves.queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            # The API currently only supports 1-channel (mono) audio
            channels=1, rate=self._rate,
            input=True, frames_per_buffer=self._chunk,
            # Run the audio stream asynchronously to fill the buffer object.
            # This is necessary so that the input device's buffer doesn't
            # overflow while the calling thread makes network requests, etc.
            stream_callback=self._fill_buffer,
        )

        self.closed = False

        return self

    def __exit__(self, type, value, traceback):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        # Signal the generator to terminate so that the client's
        # streaming_recognize method will not block the process termination.
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        """Continuously collect data from the audio stream, into the buffer."""
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            # Use a blocking get() to ensure there's at least one chunk of
            # data, and stop iteration if the chunk is None, indicating the
            # end of the audio stream.
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]

            # Now consume whatever other data's still buffered.
            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except six.moves.queue.Empty:
                    break

            yield b''.join(data)


# Sampling rate of your microphone and desired chunk size
rate = 44100
chunk = int(rate/10)

# Insert your access token here
access_token = "02HG-V4tJ7l4NH8utVjxwCIS6nWfwzW9elMQzaSDOZD8l_eztAvqUFAZl8mpcS5EsB_JyWei7uKKJogt2gRNFZ-JBYAPw"

# Creates a media config with the settings set for a raw microphone input
example_mc = MediaConfig('audio/x-raw', 'interleaved', 44100, 'S16LE', 1)

streamclient = RevAiStreamingClient(access_token, example_mc)

# Opens microphone input. The input will stop after a keyboard interrupt.
with MicrophoneStream(rate, chunk) as stream:
    # Uses try method to allow users to manually close the stream
    try:
        # Starts the server connection and thread sending microphone audio
        response_gen = streamclient.start(stream.generator())

        # Iterates through responses and prints them
        for response in response_gen:
            res = json.loads(response)
            if res['type'] == 'final':
                print(response)

                msg = combineText(res)

                announcement_type = categorize_string(msg)
                timestamp_obj = str(datetime.datetime.now().timestamp())
                timestamp_msg = timestamp_obj.split('.')[0]

                jsonObj = {
                    "announcement": msg,
                    "announcement_type": announcement_type,
                    "announcement_timestamp": timestamp_msg
                }

                db.collection("announcements").document(
                    timestamp_msg).set(jsonObj)

    except KeyboardInterrupt:
        # Ends the websocket connection.
        streamclient.client.send("EOS")
        pass
