# Systems Design
[this whole article](https://github.com/donnemartin/system-design-primer#database)

## Concurrency 

### Threads

## Networking

### TCP/IP vs. IPC

### Reverse Proxies
Act as an intermediary between the server and the client, so the server is never directly available to the client. Good when you have one server, if you have many, use a load balancer. Use several proxies so you dont have a single point of failure. Cache common queries or requests. Serve static content directly.
![logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Reverse_proxy_h2g2bob.svg/560px-Reverse_proxy_h2g2bob.svg.png)

This can protect us from ddos. When an attacker tries to flood a website, the attacker resolves only one of the proxies, when a good user comes along, their browser will try to resolve to the fastest ip, which means the down proxy will not be chosen. Or just limit number of requests from a client.

They can also cache static content to further offset load on the servers. Could be used for A/B testing without the need to use JS. Just pass along an a/b cookie and the proxy will know which variate server to go to.

## Constraints
Ask how many requests per month/second 
Helpful numbers:
Twitter has about 600m active users. Users genreate about 15bn tweets per month.


## CAP Theorem
[link](https://en.wikipedia.org/wiki/CAP_theorem)

**Consistency** – Every read recieves the most recent write or an error.

**Availability** – Every read recieves a response but it may not be the most up to date.

**Partition Tolerance** – The system continues to operate despite arbitrary partitioning due to network failures.

You always need to choose P. Networks are not reliable, so this is critical.

**CP**: Waiting for a response from the partitioned node might result in a timeout error. CP is a good choice if your business needs require atomic reads and writes.

**AP**: Responses return the most recent version of the data available on the a node, which might not be the latest. Writes might take some time to propagate when the partition is resolved. AP is a good choice if the business needs allow for eventual consistency or when the system needs to continue working despite external errors.


### Other
[arch](https://drive.google.com/file/d/0B1ljY87XS9z0aDZZRHo1dW5zZWNjQjIzcFI5TGxIRF9MSTk4/view)

[big one](https://github.com/donnemartin/system-design-primer)



### Performance Vs. Scalability 
