import cohere
from cohere.classify import Example
import pprint

co = cohere.Client("oytYT4Aa8aylkzSg7taYQcVsjiv1sEzV5W54WwTZ")

def categorize_string(categorize_string):
    response = co.classify(
    model='large',
    inputs=[categorize_string],
    examples=[
        # Next stop values
        Example("Next stop Union station, doors will be opening on the right", "Next Stop"),
        Example("Next stop Dundas station, doors will be opening on the left", "Next Stop"),
        Example("This train is now approaching Dundas Station", "Next Stop"),
        Example("Next stop is Finch Station, this is a terminal station", "Next Stop"),

        # Delay values
        Example("There has been an accident up ahead, please be patient", "Delay"),
        Example("The emergency alarm was pulled at the station up ahead, please expect delays", "Delay"),
        Example("This train is heading in the wrong direction, we are going to be stuck", "Delay"),
        Example("We are currently delayed due to a good reason", "Delay"),

        # Assitance values
        Example("Please watch your step as you exit the train", "Assistance"),
        Example("Please have your fare ready before approaching the turnstile", "Assistance"),
        Example("Please do not lean on the doors", "Assistance"),
        Example("This is the last stop on this train's route", "Assistance"),
        Example("Stand clear of the closing doors, please", "Assistance"),
        ])
    print(response.classifications[0].prediction)
    return response.classifications[0].prediction


def summarize_string(summarize_string) -> str:
    response = co.generate(
    model='xlarge',
    prompt='Summarize this dialogue:\n' +
           'Notification: Next Stop Bloor Young Station\n' +
           'Driver: There an emergency in the vehicle in front of us, please wait\n' +
           'Driver: The accident has been cleared\n' +
           'Notification: Arriving at, Bloor Young Station, doors will open on the right\n' +
           'Notification: Next Stop is Rosedale Station\n' +
           'Notification: Arriving at Rosedale Station, doors will open on the left'
           'TLDR: Traveled from Bloor Young to Rosedale Station, there train stopped between Bloor and Rosedale Station\n' +
           '--\n' +
           'Summarize this dialogue:\n' + 
           'Notification: Next Stop North York Station\n' +
           'Driver Please be sure to not lean against the doors of the train\n'+ 
           'Notification: Arriving at, North York Station, doors will open on the left\n' +
           'Notification: Next Stop is Sheppard-Young Station\n' +
           'Driver: Please be patient someone has pulled the emergency alarm in the train infront of us\n' +
           'Driver: The accident has been cleared\n' +
           'Notification: Arriving at Sheppard-Young Station, doors will open on the left'
           'TLDR: Traveled from North York to Sheppard-Young Station, there train stopped between North York and Seppard-Young Station\n' +
           '--\n' +
           'Summarize this dialogue:\n' + 
           'Notification: Next Stop North York Station\n' +
           'Driver Please be sure to not lean against the doors of the train\n'+ 
           'Notification: Arriving at, North York Station, doors will open on the left\n' +
           'Notification: Next Stop is Sheppard-Young Station\n' +
           'Driver: Please do not hold the doors of the train open\n' +
           'Notification: Arriving at Sheppard-Young Station, doors will open on the left'
           'TLDR: Traveled from North York to Sheppard-Young Station, there were no major delays\n' +
           '--\n' + summarize_string,
    max_tokens=20,
    stop_sequences=["--"],
    return_likelihoods='NONE')
    return str(response.generations[0].text)