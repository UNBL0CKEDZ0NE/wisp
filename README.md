# wisp-local

A local Wisp server (MercuryWorkshop's wisp-js).

    npm install
    npm start

Listens on ws://127.0.0.1:5001/wisp/ (any path works).
Change with env vars:  PORT=8080 HOST=0.0.0.0 npm start

Point your proxy client (Ultraviolet / Scramjet + libcurl/epoxy transport) at that URL.
If your page is served over https, the browser will block ws:// -- serve the page
from http://localhost too, or put this behind a TLS reverse proxy (wss://).
