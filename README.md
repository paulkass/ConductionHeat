# ConductionHeat

##About

This app is designed to allow users to experience conducting a simple orchestra using familiar motions. This app
plays _Mary had a Little Lamb_ in two voices: the bass and the treble. The user can control the volume of each voice
as well as the overall tempo and rhythm with special, intuitive hand motions.

##Hardware Requirements

This app relies on the [Leap Motion](https://www.leapmotion.com/) hardware to access the hand motions, so without this
device the app will not run. Make sure you have that before starting the app.

##Installation Instructions 

1. Clone the repository.
2. Run these commands from the directory of the app `git submodule init` and `git submodule update`.
3. Install the Leap SDK if you haven't already.
4. Run `npm install -g http-server'. Since this app needs a server to run, we recommend using this node tool for that 
purpose. You can use any server tool, but this is what we tested the app on.
5. Run 'http-server -p <port_number>' from the directory of the app with a port number that you like.
6. Open 'localhost:<port_number>' to access the app!

##Controls

* Raise and lower each hand to control the volume of the parts (right-hand: bass, left-hard: treble).
* Do a circular motion with your hand to increase (clockwise) or decrease (cc-clockwise) the tempo.
* Fold your hand into a fist to hold that particular note and flatten your palm to release it.

##Notes

* Make sure that the back of the palm of your hand is on the Leap device. Otherwise the device might not register the hand.
* Due to performance limitations, it is recommended that only one hand is on the device at one time. You can use both hands, but not at the same time.

##Contributing

This project is open-source so any suggestions, issues, pull-requests, and other contributions will be gladly considered.
