# Netmask Slider

A simple micromaterial to practice visualising how netmasks work.

## Motivation

I have a hard time remembering all the netmask/IP/CIDR stuff in networking, so I
thought I would make myself a simple web app to help me practice while on the go.

## The stuff to learn

example:

```
Address:   192.168.0.1           11000000.10101000.00000000.00000001
Netmask:   255.255.255.255 = 32  11111111.11111111.11111111.11111111
Wildcard:  0.0.0.0               00000000.00000000.00000000.00000000
=>
Network:   192.168.0.1/32        11000000.10101000.00000000.00000001  (Class C)
Broadcast: 192.168.0.1           11000000.10101000.00000000.00000001
HostMin:   192.168.0.1           11000000.10101000.00000000.00000001
HostMax:   192.168.0.1           11000000.10101000.00000000.00000001
```


...that means the the netmask specifies that one and only one host is at this IP
address. Because it's all 1's (32 of them, as you can see), that yields a CIDR range
of 192.168.0.1/32.

if, on the other hand, the network configuration looks like this:

```
Address:   192.168.0.1           11000000.10101000.00000000 .00000001
Netmask:   255.255.255.0 = 24    11111111.11111111.11111111 .00000000
Wildcard:  0.0.0.255             00000000.00000000.00000000 .11111111
=>
Network:   192.168.0.0/24        11000000.10101000.00000000 .00000000 (Class C)
Broadcast: 192.168.0.255         11000000.10101000.00000000 .11111111
HostMin:   192.168.0.1           11000000.10101000.00000000 .00000001
HostMax:   192.168.0.254         11000000.10101000.00000000 .11111110
```

...then it's obvious that the 24 1's in the netmask will yield a CIDR range of
192.168.0.1/24.


## The app

Just a single page that shows a randomly generated IP address, and the ability to
slide the netmask 1's to the right. As you slide, you can see how it affects the
CIDR range, the Netmask in octal format, and the number of possible hosts.
