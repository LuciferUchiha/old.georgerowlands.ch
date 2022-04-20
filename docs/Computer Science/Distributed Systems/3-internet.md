
IETF = Interent Engineering Task Force goal is to make the internet work better. define interent standards and regulate interent through RFC (Request for comments)specifications.

Most well known:

- Interent Protocol
- Email
- Hyper Text coffee Pot Control

## HTTP Protocol

Hypertext transfer protocol. Protocol to access satic or dynamic data on another computer. based on reliable transport layer typically TCP/IP
Vesions 1.0, 1.1 and 2.0

### Request

consists of request line with Method, target and version CR LF the rest consists of headers wich are key-value pairs sperated with CR LF and then the body which is a chunk of bytes

#### Methods

#### Headers

### Response

Status line http version, status code and message, http headers and body

#### Codes

#### Headers

### MIMI Types

Multipurpose Internet Mail Extensions (MIME)
Standard for sending multipart, multimedia data through internet email
Format: media type = type subtype { “;” parameter }
Types: text / image / audio / video / application / message / multipart
Subtypes starting with x are non standard subtypes
text/ html;charset =ISO 8859 1
application/octet stream
image/jpeg

### Enhancements

Over the years the HTTP protocol has been enhanced and newer versions have been released/specified.

#### Version 1.1

- Network connection management
  - Persistent connections were introduced, meaning that several requests can be sent over the same connection
  - Pipelining was introduced, meaning you can send a new request before the previous ones have even been answered

- Bandwidth optimization
  - Clients can request parts/ranges of documents for example to complete a previously interrupted request
- Message transmission
  - Trailers were introduced, meaning message headers can be delivered at the end of the body which can also be similar to a checksum
  - Transfer encoding and content length. Clients reading a resposne need to know when they have reached the end. Servers can indicate the end of a message in four ways
    - Implied content length, for example certain response codes like 304 are defined to never have content, so the client can assume the response to terminate with a double CR LF
    - Content-length header, the length of the content is specified in the content-length attribute in bytes.
    - Chunked encoding, the content is broken down into a number of chunks each prefixed by its size in bytes, a zero size chunk then indicated the end of the message. For this to work the server must set the header to `transfer-encoding : chunked`.
- Internet address conservation

#### Version 2.0

- Binary, packet-based protocol. With the switch to 2.0 all HTTP messages are split and sent in clearly defined frames. This also means that chunked transfer encoding must not be used with HTTP/2.0. This switch provides more mechanisms for data streaming but also allows for more efficiency.
- Multiple requests can now be sent in parallel over a single TCP connections.
- HPACK, headers are compressed and cached on the server
- Servers can push resources together with a requested resources for example a script or css file along with a HTML page.

## Web server using Java

## Servlets
