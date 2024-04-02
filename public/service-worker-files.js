import { createPartialResponse } from 'workbox-range-requests';

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Check if the request is for a Firebase Storage resource
  if (
    request.url.startsWith(
      'https://firebasestorage.googleapis.com/v0/b/edu-quest-c471f.appspot.com/o/'
    )
  ) {
    event.respondWith(handleFirebaseStorageRequest(event));
  }
});

async function handleFirebaseStorageRequest(event) {
  const { request } = event;
  const cache = await caches.open('video-cache');

  try {
    // Attempt to fetch the resource from the network
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // If network response is successful, cache the response and return it
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    } else {
      // If network fetch fails, attempt to serve the response from cache
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
        // If no cached response is available, return a custom response indicating the failure
        return new Response('Failed to fetch video', {
          status: 500,
          statusText: 'Internal Server Error',
        });
      }
    }
  } catch (error) {
    // If network fetch fails, attempt to serve the response from cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      // If no cached response is available and network fetch also fails, return an offline message
      return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
      });
    }
  }
}
