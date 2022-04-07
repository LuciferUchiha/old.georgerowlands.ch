Threads, wie Prozesse, erlauben einer Anwendung
mehrere Aufgaben gleichzeitig zu erledigen.
Ein einzelner Prozess kann mehrere Threads haben.
Wenn ein Thread blockiert, z.B. beim Warten auf I/O,
können andere Threads unterdessen weiter laufen,
auf Mehrprozessorsystemen sogar echt parallel.
teilt
sich denselben globalen Speicher
"privaten"
Stack für lokale Variablen und Funktionsaufrufe
fork() zu erzeugen ist relativ "teuer",
Informationen zwischen Prozessen auszutauschen ist
aufwändig, Parent und Child teilen keinen Speicher
Threads teilen sich folgende Attribute per Prozess:
PID und Parent PID, Offene File Deskriptoren, Signal
Handler, Terminal, Working Directory, CPU Zeit und
konsumierte Ressourcen, Limiten für Ressourcen, …
Folgende Attribute gibt es für jeden Thread separat:
Thread ID, Signal Maske, errno Variable, Stack
Die Pthreads API Schnittstelle definiert Datentypen:
pthread_t, pthread_mutex_t, pthread_attr_t, …
Und Funktionen, um Threads zu erzeugen/beenden.
Die Pthreads Funktionen geben nicht -1 zurück, der
return-Wert ist 0 bei Erfolg, +errno bei Fehlern.
gcc Compiler Flag -pthread

int pthread_create(
pthread_t *thread, // der neue Thread
const pthread_attr_t*attr, // Default NULL
void *(*start) (void *), // Start-Callback
void*arg); // Argument für Start-Callbac

Threads enden mit einem Aufruf von pthread_exit():
void pthread_exit(void *status); // siehe Join
Oder die start-Funktion des Threads ruft return auf.
Oder Thread wird abgebrochen mit pthread_cancel():
int pthread_cancel(pthread_t thread);
Oder beliebiger Thread ruft exit() auf, bzw. main()
ruft return auf, worauf alle Threads sofort enden.

Thread IDs auf Gleichheit testen mit pthread_equal():

Auf Exit eines Threads t warten mit pthread_join():
int pthread_join(pthread_t t, void **result);
Falls es kein Join gibt für einen Thread, wird er zu
einem Zombie-Thread

int pthread_detach(pthread_t thread);
Nach Ablauf des Threads räumt das System alles weg.
