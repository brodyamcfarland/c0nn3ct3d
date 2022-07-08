======================TO DO==========================
- Added loggedIn state for showing online for future state

0) Make it so while the Profile pic is loading, it shows an Icon or Loading... in small letters
1) Make a Post Component
2) Make sure the photo button will allow you to add a post along with text inside of the text area or in a modal
3) Make the Profile Pic in Feed.tsx a Silhouette of something when not connected
    - also make it so the info goes away when you disconnect from metamask
4) set up firebase to connect to Posts and Images --Blockchain storage too expensive for mainnet
5) Firebase will need an ID to Map to the tweets being stored, Map TokenId to Post ID?
6) Search Button Needs to have some functionality in Widgets.tsx
    - Maybe just ctrl+F the posts or look up users who have posts (we'll see)
7) Add some connectivity to the Metrics sections of the Widgets.tsx 
8) Timestamps will be handled by Firebase?

===================DESIGN============================
1) Need to have the Profile Pic, Name, and Bio to have a bigger min width to allow for larger names, etc.
===================NICE TO HAVES=====================
- Figure out to make only the middle column scroll
- Daily Sentiment up or down button
    - can click 1x per day
    - avg % starts at 50%
    - each person moves 2% since its a small app
    - or something different
- Make an animation where 003 shifts to full logo upon refresh

