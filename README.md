# Description

A simple and efficient LRU cache for [node.js](http://nodejs.org/).

## Installation

    npm install lrused

## API

* **(constructor)**(< _integer_ >capacity) - Creates and returns a new LRU cache instance with the given maximum capacity.

* **get**(< _mixed_ >key) - _mixed_ - Returns the cached data identified by `key` and refreshes the cache entry.

* **set**(< _mixed_ >key, < _mixed_ >value) - _(void)_ - Adds or updates and refreshes the cache entry identified by `key` with the given `value`.
