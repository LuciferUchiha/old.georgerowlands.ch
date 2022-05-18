slidenumbers: true
footer: My Footer
autoscale: true

# A Presentation of Things

### By George Rowlands

---

# This is a Title

## The cool way

You can do all of these things:

- Thing 1 which is pretty cool
- Things 2 which is even cooler
- Things 3 which is pretty crap

^ This is a presenter note.

---

[.code-highlight: 2-8]
[.code-highlight: 10-15]

```javascript
function Rain({ numDrops }) {
  const { height, width } = useWindowDimensions();

  const drops = useMemo(() => {
    const generatedDrops = [];

    // scales numDrops to screen dimensions
    for (let i = 1; i < numDrops * (width / 1000); i += 1) {
      const dropLeft = randRange(0, width);
      // this number needs to be adjusted so there isn't an underflow
      const dropTop = randRange(-1000, 800);
      generatedDrops.push({ id: i, left: dropLeft, top: dropTop });
    }
    return generatedDrops;
  }, [numDrops, width, height]);

  return (
    <RainContainer>
      {drops.map((drop) => (
        <Drop key={drop.id} className="drop" left={drop.left} top={drop.top} />
      ))}
    </RainContainer>
  );
}
```

---

# This is a title

## This a subtitle

This is some very long text with code sum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

```java
public class Person {
    private final String firstname;
    private final String lastname;
    private final int age;

    public Person(String firstname, String lastname, int age){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }
}
```
