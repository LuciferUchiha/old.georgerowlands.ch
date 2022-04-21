servlet is a program that runs on a server and genereates a respones upon a http request. Are executed in the context of the web server (tomcat) part of java EE / Jakarta EE

Spring framework 6 and sping boot 3 use Java 17 and jakarata EE

classes that are protocol independetnt are in jakarata.servlet, http specific interfaces and classes are under jakarta.servlet.http

Servlet life-cycle defined by Servlet interface. init, destroy and service

HttpServlet is abstract class to be subclassed by concrete HTTP-servlets alogn with service forwards requests to matching method you have doGet, doPost etc. HttpServletRequest parameter provides client request information, HttpServletReponse supports servlets in sending the reponse.

## Apache Tomcat

is a servlet container and a web server program capable of executing java byte code. Is not the most efficient web server however still very widely used.
