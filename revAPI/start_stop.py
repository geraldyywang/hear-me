from itertools import cycle
import time

# Paths for the subways to travel for the different QR codes
path_list_A = [
    "Honeymoon Station",
    "Lovers Station",
    "Happy Station",
    "Warm Station",
    "Bed Station",
    "Romance Station"
]

path_list_B = [
    "Lonely Station",
    "Sad Station",
    "Isolation Station",
    "Alone Station",
    "Unpopular Station",
    "Abandoned Station"
]

class Station():

    def __init__(self, before, current, after) -> None:
        self.before = before
        self.current = current
        self.after = after

    def __repr__(self):
        return "{} Station: \n{} Previous to it \n{} Preceeding it".format(self.current, self.before, self.after)


def scan_QR_code(path_name):

    # Check which path it we're taking 
    if str(path_name) == "path_A":
        path_list = path_list_A
    elif str(path_name) == "path_B":
        path_list = path_list_B
    else:
        print("There has been an error with the QR code return data")
        path_list = list()

    # This will create a "station_list" filled with station's name and it's before and after station
    interator_path = cycle(path_list)
    station_list = []
    for value in path_list:
        recent_stop = next(interator_path)
        index = path_list.index(recent_stop)
        if index + 1 < len(path_list):
            current_stop = path_list[index + 1]
            if index + 2 < len(path_list):
                next_stop = path_list[index + 2]
            else:
                next_stop = path_list[0]
        else:
            current_stop, next_stop = path_list[0], path_list[1]
        station_list.append(Station(before=recent_stop, current=current_stop, after=next_stop))
    
    # Run this while loop so long as the request stop button isn't pressed
    button_pressed = False
    interator_station = cycle(station_list)
    while not button_pressed:

        #TODO This station_location variable has the .before .current .after info we need in firebase
        station_location = next(interator_path)
        print(station_location)
        time.sleep(10)

        speaker_requested = False
        if speaker_requested == True:
            # Listen to the audio clip

            # Categorize it with co:here

            # Shove it to firebase

            time.sleep(4)

        stop_requested = input("Do you want to exit the bus? ")
        if stop_requested == "STOP THE BUS": 
            current_stop = next_stop
            button_pressed = True

scan_QR_code("path_A")