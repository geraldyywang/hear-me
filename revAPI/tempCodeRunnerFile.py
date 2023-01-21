# Opens microphone input. The input will stop after a keyboard interrupt.
# with MicrophoneStream(rate, chunk) as stream:
#     # Uses try method to allow users to manually close the stream
#     try:
#         # Starts the server connection and thread sending microphone audio
#         response_gen = streamclient.start(stream.generator())

#         # Iterates through responses and prints them
#         for response in response_gen:
#             res = json.loads(response)
#             if res['type'] == 'final':
#                 print(response)
#                 # doc_ref = announcements_collection.document(
#                 #     "testing")
                
#                 # jsonObj = {
#                 #         "announcement_json": response,
#                 #         "announcement_type": "stop",
#                 #         "announcement_timestamp": str(datetime.datetime.now().timestamp())
#                 #     }
#                 # doc_ref.set(jsonObj)
#                 print("ITERATION ENDED!!!!!!!!!!!!!")

#     except KeyboardInterrupt:
#         # Ends the websocket connection.
#         streamclient.client.send("EOS")
#         pass