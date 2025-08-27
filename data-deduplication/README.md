# Duplicate Title and Description Finder Microservice

## Overview

This microservice processes a list of internal website links and identifies duplicate **titles** and **descriptions**.
It receives an array of crawled internal link objects (with fields like `url`, `title`, `description`, etc.) and outputs two grouped datasets:

* URLs grouped by duplicate **titles**
* URLs grouped by duplicate **descriptions**

Only titles or descriptions that appear at least **twice** will be included in the result.

## Example Input

```json
[
  { "url": "/page1", "title": "Home", "description": "Welcome to site" },
  { "url": "/page2", "title": "Home", "description": "Another desc" },
  { "url": "/page3", "title": "About", "description": "Welcome to site" }
]
```

## Example Output

```json
{
  "titles": {
    "Home": [
      { "url": "/page1", "title": "Home", "description": "Welcome to site" },
      { "url": "/page2", "title": "Home", "description": "Another desc" }
    ]
  },
  "descriptions": {
    "Welcome to site": [
      { "url": "/page1", "title": "Home", "description": "Welcome to site" },
      { "url": "/page3", "title": "About", "description": "Welcome to site" }
    ]
  }
}
```

## Queueing

* Requests to process data should be **queued**.
* In the original project, another service triggered this process on a schedule, so the microservice needed to manage its own queue.

## Large Input Challenge

Some websites may contain **50k–100k+ internal links**.
Processing multiple such requests could block the queue and degrade performance.

### Solution Direction

To handle this load:

* Processing will be delegated to **Node.js Worker Threads** instead of blocking the main thread.
* Tasks will be distributed across multiple workers to keep the queue responsive.
* Exact algorithm and implementation details will be added during development.

## Status

* Problem recalled and documented ✅
* Implementation details TBD 🔄
* Worker thread delegation planned 🛠️

---
