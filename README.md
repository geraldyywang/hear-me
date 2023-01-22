#UofT Hacks X

## Inspiration
We were inspired to create this project because of our own personal experiences with public transportation. As frequent users, we often missed important announcements or our stop due to unclear audio or distractions. This realization made us imagine how much more challenging this must be for deaf individuals who rely on visual cues to access the same information. This sparked the idea for our project - an application that uses QR codes to provide real-time transcription and categorization of the conductor's words to improve accessibility and inclusivity for deaf individuals on public transportation. We aim to bridge the communication gap and empower marginalized communities through this innovative solution.

## What it does
The application works by allowing users to scan a QR code on public transportation, which will then subscribe them to a live transcription and categorization of the conductor's words. The transcription will be in real-time and users will be able to access it through their devices. This will enable individuals that have trouble understanding to have access to the same information as the hearing individuals, such as announcements, stops, and other important information. The application also provides a categorization feature that will help users to understand the nature of the announcements.

## How we built it
Our application consists of two major components:

### A Python service
* The service is hooked to a laptop microphone stream that is processed in real-time by Rev.ai.
* The resulting close caption is then classified by Cohere to identify the type of announcement.
    * Next-stop announcement (e.g. next stop is Oakville GO)
    *  Assistance announcement (e.g. coaches 26 and 27 will not be opening at Union Station)
    * Delay announcement (e.g. the train will be arriving 10 minutes late due to a delay at Oshawa GO)
* The classification and the announcement itself are then posted to a Firestore collection.

### A React-Native mobile application
* Scans a QR code (e.g. a QR code on the back of your seat on the train)
* Subscribes to the Firestore collection based on the QR code you scan
* Takes the latest logs from the store and displays them to users as a card that is color-coded depending on the type of announcement! 😱
    * Due to it being a live data collection, Firebase will update the observer (our app) if there is new data 🎉🎉🎉
* There is also a summary feature where all the recent announcements are summarized using Cohere and displayed in an easy-to-digest format! 🫡

## Challenges we ran into
During the development of our project, we faced several challenges. One of the first challenges we encountered was setting up React Native in our development environment. This required a significant amount of time and effort to configure and troubleshoot. Another challenge we faced was with the Rev.ai API. Initially, we had difficulty figuring out how to live-stream audio, which was crucial for the real-time transcription feature of our application. Additionally, we struggled with designing our system in a way that was both practical and feasible for the demo, while also avoiding over-engineering. This required a lot of thought and experimentation to find the right balance. All in all, these challenges tested our problem-solving skills, resilience, and determination but helped us to improve and refine our project to make it better.

## Accomplishments that we're proud of
We are proud of several accomplishments we achieved while working on this project. One of our main achievements was successfully implementing the live-stream transcription feature using the Rev.ai API. This was a significant challenge that required a lot of effort and determination to overcome. Additionally, we are proud of the design of our application, which is user-friendly and easy to navigate, making it accessible to all users. We also managed to implement the QR code feature, which allows the user to subscribe to the live transcription and categorization service.
Additionally, we're proud of creating something that can make a real impact on accessibility and inclusivity for deaf individuals on public transportation. We believe that our project can help to bridge the communication gap and empower marginalized communities.

## What we learned
During this hackathon, we learned several valuable lessons. One of the most significant things we learned was the importance of trying new technologies. We all had the opportunity to work with Firestore, which was a new library for us, and it was an amazing experience to work with it. Rev.ai was also a technology that we never thought would have existed until this hackathon. Furthermore, using Cohere opened our eyes to the never-ending capabilities of large language models.
We also learned about the value of **exploring** existing concepts and finding ways to bring innovation to the table. This project allowed us to explore new ways of solving a problem that affects many people and showed us how technology can be used to empower marginalized communities and break down barriers to inclusion. Furthermore, we also learned about the importance of user-centered design and the balance between practicality and feasibility when developing a product. Overall, this hackathon was an enriching learning experience that helped us to develop our skills and gain new insights.

## What's next for Hear.Me
The next steps for our project include pitching the idea to government organizations such as the Government of Ontario (GO) and the TTC. We believe that our project can make a real impact on accessibility and inclusivity for deaf individuals on public transportation, and we want to explore opportunities to implement it on a larger scale. We will reach out to these organizations and present our project, highlighting its potential benefits and discussing potential implementation strategies. Additionally, we will continue to improve and refine the application based on feedback and testing. We will also explore other potential partnerships and collaborations that could help us to bring this innovative solution to more people. Overall, our goal is to bring our application to as many public transportation systems as possible, to empower marginalized communities, and break down barriers to inclusion.
