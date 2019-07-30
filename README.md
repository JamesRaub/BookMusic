# BookMusic

## Project Description
Listening to the incorrect choice of music while reading often leads to distraction and the inability to retain what was just read. In other times it may lead to frustration and annoyance. Our project solves this issue by analyzing the sentiment of the text before matching the user with the correct selection of music. the user links an e-book or text file to our web application, and our analyzer will start playing the appropriate songs at the correct parts of the text. For example, during the exciting scenes of a book, the application will play songs with high energy and lively spirit. In quieter scenes, the application will play more appropriate low-tempo songs. This is all done using an algorithm that we have built to match the music with categories such as danceability and energy. Our internal tool also leans on the use of IBM Watson's Tone Analyzer tool and Spotify's music api tools.

Built With:
IBM Watson
Spotify API
Node.js
Express.js

## Emotion to Music Aspect Conversion
IBM Watson Tone Anaylzer records emotions as a decimal representation from 0 to 1 for five different emotions: disgust, fear, anger, joy, sadness. 

The Spotify API has a variety of metrics that it uses to perform a track analysis such as tempo, energy, danceability, loudness, valence, and beat structure. 

Since both calls return number representations in between 1-0 we used some of the following conversions to yeild the total emotional value of a song.

energy= (disgust + fear + anger + joy + sadness)/5

danceability = joy + anger + fear - sadness

After converting this metric, we used the Spotify API to search for the song that was closest to this particular value. 

(see the picture for an example query on the Three Little Pigs)

## Future Plans
Beyond this hackathon, we aim to improve our creation by incorporating different font faces, different colors, sizes. Enabling user accounts lets users store their preferred listening settings. With our algorithm, we aim to replace classic e-book readers by providing uers with a premium reading experience never seen before.

