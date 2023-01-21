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
            Example(
                "Next stop Union station, doors will be opening on the right", "Next Stop"),
            Example(
                "Next stop Dundas station, doors will be opening on the left", "Next Stop"),
            Example("This train is now approaching Dundas Station", "Next Stop"),
            Example(
                "Next stop is Finch Station, this is a terminal station", "Next Stop"),

            # Delay values
            Example(
                "There has been an accident up ahead, please be patient", "Delay"),
            Example(
                "The emergency alarm was pulled at the station up ahead, please expect delays", "Delay"),
            Example(
                "This train is heading in the wrong direction, we are going to be stuck", "Delay"),
            Example("We are currently delayed due to a good reason", "Delay"),

            # Assitance values
            Example("Please watch your step as you exit the train", "Assistance"),
            Example(
                "Please have your fare ready before approaching the turnstile", "Assistance"),
            Example("Please do not lean on the doors", "Assistance"),
            Example("This is the last stop on this train's route", "Assistance"),
            Example("Stand clear of the closing doors, please", "Assistance"),
        ])
    print(response.classifications[0].prediction)
    return response.classifications[0].prediction
