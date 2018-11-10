/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/react-mobx-vm/404.html","8d6f6ce0565420ac3f1f8880786c2f44"],["/react-mobx-vm/PICIDAE_COMMON.js","2d571f8ca4f81f28eec6afb3c2bcdfb5"],["/react-mobx-vm/PICIDAE_ENTRY.js","cefbb8500674dc3d46f6f48fd19153f8"],["/react-mobx-vm/advanced/__information__.html","9f7db6432b607cc3e7ee0594ec4107b7"],["/react-mobx-vm/advanced/__information__.js","bfe22df6d23ef8e944a68966ba723396"],["/react-mobx-vm/advanced/life-cycle.html","36eaa8d612d0fbc15635aecbf4ef847d"],["/react-mobx-vm/advanced/life-cycle.js","33e84e7019aeda8d69321c42abb895ce"],["/react-mobx-vm/advanced/mixed-renderer.html","5ab7551603e9a3a17035e692917b076a"],["/react-mobx-vm/advanced/mixed-renderer.js","831392352bdbd512fcd9e6da154c3575"],["/react-mobx-vm/api.html","8d6f6ce0565420ac3f1f8880786c2f44"],["/react-mobx-vm/api/__information__.html","b79e0c305e982a79c709f052a024ce8a"],["/react-mobx-vm/api/__information__.js","ad8cf965889fe81de1e7cefcda18fcaf"],["/react-mobx-vm/api/decorator.html","94b48cb17c9b6f03ffc4d1f10c6b9db9"],["/react-mobx-vm/api/decorator.js","a577184956f8189fb591a29e3225440f"],["/react-mobx-vm/api/others.html","d6f8b710bdadfc9a2ea42096ec383091"],["/react-mobx-vm/api/others.js","cfec450f88bd0ac2dd6efc9165871fbe"],["/react-mobx-vm/docs.html","8d6f6ce0565420ac3f1f8880786c2f44"],["/react-mobx-vm/examples/__information__.html","5fd76943459741d1f84bc2253a442139"],["/react-mobx-vm/examples/__information__.js","994858abbbdd3fa395de5985026b0f43"],["/react-mobx-vm/examples/binding.html","55bf1c560f1599b9071c9edbce4a3648"],["/react-mobx-vm/examples/binding.js","e117019da7a4e7b00c5b30de76381d0a"],["/react-mobx-vm/examples/inject-collect.html","cc391c2caf5ed5792f8a68a9f758ba6d"],["/react-mobx-vm/examples/inject-collect.js","c46d5ba4a8632460f0f9422c07d8e018"],["/react-mobx-vm/examples/react-data-binding-based-on-mobx.html","80420a00e93f6bd8af0a022da7f19102"],["/react-mobx-vm/examples/react-data-binding-based-on-mobx.js","9627aa9a6640c0e1c1db13cf5bde8857"],["/react-mobx-vm/examples/url-sync.html","1cc05fd9070dc202d4e51a805d422529"],["/react-mobx-vm/examples/url-sync.js","b6a8f55a4480abec68140d505df9f985"],["/react-mobx-vm/guide/__information__.html","ba95a9ab422a3f429b0c736879f7e005"],["/react-mobx-vm/guide/__information__.js","df88ad100429f15570b491b439480e1c"],["/react-mobx-vm/guide/contrast.html","a85326573bfa7cafb313af8445e3cbbe"],["/react-mobx-vm/guide/contrast.js","e493640cc317dff640a69cfcfc39d262"],["/react-mobx-vm/guide/index.html","cfb128a4e9f6d2194a37798595559e55"],["/react-mobx-vm/guide/index.js","a8d0ac9606fa45d970baeaaf64ccfe96"],["/react-mobx-vm/index.html","ca167390fe483b00e7a7a384620945df"],["/react-mobx-vm/index.js","107a0c7b33b85e52101d806d0c2432bd"],["/react-mobx-vm/style.css","048d42534844e9c62406e231c632209e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  return;
                  // throw new Error('Request for ' + cacheKey + ' returned a ' +
                  //  'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    if (!shouldRespond) {
      shouldRespond = [
        url.replace(/\/*$/, '.html'),
        url.replace(/\/*$/, '/index.html'),
        url
      ].some(function (maybeUrl) {
        if (urlsToCacheKeys.has(maybeUrl)) {
          url = maybeUrl
          return true
        }
      })
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/react-mobx-vm/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







