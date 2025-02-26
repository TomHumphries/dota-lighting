# Game State Integation Lighting
This project uses DotA 2's Game State Integration and Home Assistant to update your smart lights based on the live in-game events.  
For example, the lights are bright during the day and dim at night. The lights turn red on death and briefly turn gold when respawning.   

## Application Overview
- DotA 2 sends POST requests containing the game state to `/dota-gsi`.
- In this application, the state set in an instance of the `GameStateSubject` class. The `GameStateSubject` instance uses the Subject/Observer pattern to notify parts of the application that need to react to changes in the game state.
- The game state is observed by different lighting conditions. These lighting condition classes follow the `GameStateObserver` interface and `ILightingEffect` interface. 


## Setup
### Preparing the `.env` file
Copy and Paste the `example.env` file and rename the new file to `.env`

### 1. Set which Smart Lights to control
To configure what smart lights you would like to react to in-game events edit the `.env` file.  
Note - this should not effect the functionality of these lights when this application is not running.  
Add a csv of the Entitiy IDs from Home Assistant to the property `LIGHT_IDS`.  
These are often named things like `light.desk_lamp_1`.  
For example:
```
LIGHT_IDS="light.desk_lamp_1,light.desk_lamp_2"
```
Currently only RGB-capable lights are supported.  

### 2. Set your Home Assistant Access Token
This is what allows this application to change the lighting effects in Home Assistant.  
To create a token for the `home_assistant_token` env variable:
1. Go to your [Home Assistant](http://homeassistant.local:8123), ususally at http://homeassistant.local:8123
2. Go to your [profile page](http://homeassistant.local:8123/profile/general), in the bottom left
3. Select the [security tab](http://homeassistant.local:8123/profile/security) at the top
4. Scroll down to _Long-Lived Access Tokens_ and create a token

### 2a. Home Assistant REST API
Ensure your Home Assistant [allows REST API requests](https://developers.home-assistant.io/docs/api/rest/).  
(This should work out-of-the-box).  

### 3. Enable DotA 2 Game State Integration in Steam
This tells DotA 2 to send updates about it's state.  
Game State Integration is not enabled by default because [game state integration can have a small per-frame performance impact](https://www.dota2.com/newsentry/4491783379124370818).
1. Open Steam
2. Find DotA 2 in your Steam Library (in the list on the left)
3. Right click on DotA 2 and select _Properties_.
4. Under the _General_ settings page, under the _Launch Options_ section, add `-gamestateintegration` to the text box.  

### 4. Create a Game State Integration config file
This tells dota where to send the game events.  
1. Navigate to the directory where Game State Integration files are stored. If Steam is configured to be installed on your C drive, this is ususally:  
`C:\\Program Files (x86)\Steam\steampapps\common\dota 2 beta\game\dota\cfg\gamestate_integration`
2. Create a new config file in this directory that ends with `.cfg`.  
The name is not important but I recommend calling it something like `home-assistant-lighting.cfg`
3. Open the file in a text editor (e.g. notepad) and enter the following config:
    ```
    "Dota 2 Game State Integration Configuration"
    {
        "uri"          "http://localhost:3000/dota-gsi"
        "timeout"      "5.0"
        "buffer"       "0.1"
        "throttle"     "0.1"
        "heartbeat"    "30.0"
        "data"
        {
            "provider"        "1"
            "map"             "1"
            "player"          "1"
            "hero"            "1"
            "abilities"       "1"
            "items"           "1"
            "events"          "1"
            "buildings"       "1"
            "league"          "1"
            "draft"           "1"
            "wearables"       "1"
            "minimap"         "1"
            "roshan"          "1"
            "couriers"        "1"
            "neutralitems"    "1"
        }
    }
    ```
    This tells dota which game events to send and where to send them. If you are hosting on a different port to `3000`, make sure you update the `uri`.

## Simulating Gameplay Events
To test the system without launching DotA 2, set `use_mock_game_state=true` in the environment variables.  
This will cycle the day-night lighting every 10 seconds, as well as randomly killing and respawning the `hero`.  
This will simulate:
- Day lighting
- Night lighting
- Death lighting
- Respawn lighting

## Known Issues
There is sometimes a delay updating the lights in Home Assistant and it seems that the order-of-operation is not guaranteed. This _sometimes_ means that lighting changes occur in a different order to the order of in-game-events if they occur < 1 second apart.  

## Planned Features
Abstract out the game-state -> light-effect logic into configurations that are loaded at run-time. This would allow complex lighting effects at the cost of configuration / setup complexity.

## Pull Requests and Code Reuse
Please keep any pull requests small, or [raise an Issue](https://github.com/TomHumphries/dota-lighting/issues/new) first if you're planning on making a big change.  
If you use this project as a starter for your own project I'd love to hear about what you've created!
