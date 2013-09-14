# Pathfinder Item Generator

This is a basic magic item generator for the Pathfinder role playing system. It's intended primarily for a Kingmaker campaign, but could be repurposed. Data is taken partly from the core rulebook and partly from Ultimate Equipment, mostly based on what I felt like at the time. 

## Notable things left undone:

4. Fix random-weapon-table to include data for missing segments (possibly just GM whim)
5. Format data in a saner way to allow for cleaner code (OMGWTFBBQ demultiplexers what was I thinking when I wrote that code?)
6. Add keyboard shortcuts (change fields, run generator, toggle debug)
7. Add checks to avoid illegal weapon special abilities (like a keen greatclub)
8. Get proper reference URLs for weapon/armor/shields
    * base weapon itself
    * special abilities
    * specific weapons/armor
9. Make it more prettier 
10. Clean up special ability handling code 
11. Clean up item formatter code
12. Build/minification step

## Running a dev copy
(on Mac/Linux. You're on your own for Windows)
1. Install Node and npm, if not already installed. Google for directions.
2. Install Bower: `npm install -g bower` You may need to use `sudo npm install -g bower` or equivalent
3. Clone this project
4. Run `bower install` inside cloned project
5. run the "copy_dependencies" script (in its current directory)
5. Open index.html in a browser




