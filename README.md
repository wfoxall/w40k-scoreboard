# W40k Scoreboard

This is a simple scoreboard for Warhammer 40k. It was designed for recording/streaming via OBS but works great as a live scoreboard during matches too.

Features:
- Two window design separating the scoreboard from its controls
- Works offline in any modern browser (no dependencies needed)
- Library of armies (organised by superfaction, faction and detachment) for quick selection
- Scoring by primary, secondary and extra (eg. Battle Ready) VPs as well as a separate CP counter
- Settings to control scoreboard appearance

## Quick Start

1. Download build from the latest release
2. (Optionally) Add a 'avatars' directory alongside the `index.html` file. (See 'Faction Avatars' instructions below)
3. Open `index.html` in OBS (See 'OBS Setup' below) or your web browser of choice.

## Setup

### Faction Avatars

Each faction can have an avatar which will appear on the scoreboard above the player's score. **Avatars are not included in this repo nor the release builds**.

To display avatars, you will need to add correctly named .png files to an `avatars` directory alongside the `index.html` file.

Each avatar should be a png, named after the faction in kebab-case. Eg. `black-templars.png`.

The see the names the app expects, inspect the [armies config file](src/assets/armies.json).

### OBS Setup

1. Add two **Browser** sources to your scene. One will be for the control panel and the other the scoreboard itself.
2. Set the path of the `index.html` as the source URL, using the file:// protocol, and append `#/scores` for the score board.</br>
Eg:
   - Control panel: `file://path/to/my/index.html`
   - Score Board: `file://path/to/my/index.html#/scores`
   > **Do not** tick 'Local File', but instead just set the URL to the path of your index.html file. 
3. Move the control panel source off your canvas so it's not included in your stream/recording, then click the 'Interact' button to open it in OBS' browser window.
4. Use the browser window to change all required settings and control the scores during the stream/recording!

## Usage
> To Do

## Development/Building from source

To make changes to the app or to contribute to development, you will need [Node.js](https://nodejs.org/en) installed, then:

1. Clone this repo
2. Open a terminal at the root of the repo
3. `npm install`
4. Run or build:
   - `npm run dev` to run development server
   - `npm run build` to build the app.

## What's in it?

- [Vue 3](https://vuejs.org/)
- [Nuxt UI](https://ui.nuxt.com/) + [TailwindCSS](https://tailwindcss.com/) for styling
- [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) for inlining JS & CSS to avoid CORS restrictions when running via file:// protocol
- [Inspira UI](https://inspira-ui.com/) for shiny sprinkles

## Contributing

Having never actually played W40k myself, this app's design is based on quick research and advice from others that do.

I'd be very grateful for help in any of the following areas:

- The detachments list will likely become outdated. Please feel free to open an issue if you spot any I've missed!
- Documentation to help others get up and running. Particularly addressing any gotchas with OBS or streaming/capture in general.

Of course if you spot any other problems, feel free to open an issue. I'm currently focussing on fixing problems rather than implementing new features. 

:)