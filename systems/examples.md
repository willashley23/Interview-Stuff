# Examples

## Design TinyUrl

### Questions

1. Number of queries per second? *400 queries per second in total. 360 read queries and 40 write queries per second.*
2. What is the shortest we can make these URLs in order to store 6 billion of them. *x^62 > 6\*10^9* Log problem.


## DB Layer

### Database Model


id(auto increment)  | original_url | short_url
------------- | ------------- | ---------- 
1  |   |  
2 |   |

### Getting the short url

1. Hash the original URL to 2 digits.
2. Use that as the key to locate the machine.
3. Insert original URL into the databse and use `getShortURL`.
4. Combine the hash key and the short url for our final short url.

Going the opposite direction we can find the original URL from the short url:

1. Get the first two chars in the short url as the hash key.
2. Use that key to locate the machine.
3. Search that machine for the short url - hash key string
4. Return it.


`getShortURL` takes the id of the original url in the db and converts it to base64[0-9A-Za-z]