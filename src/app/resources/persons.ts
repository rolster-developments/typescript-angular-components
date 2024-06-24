class Person {
  constructor(
    public readonly documento: string,
    public readonly nombre: string
  ) {}
}

class PersonElement {
  public initials: string;

  constructor(private person: Person) {
    this.initials = person.nombre;
  }

  public get title(): string {
    return this.person.nombre;
  }

  public get subtitle(): string | undefined {
    return `Documento: ${this.person.documento}`;
  }

  public get description(): string {
    return this.person.nombre;
  }

  public get value(): any {
    return this.person;
  }

  compareTo(_: unknown): boolean {
    return true;
  }

  hasCoincidence(pattern: string): boolean {
    return this.person.nombre === pattern;
  }
}

export const personsElement: PersonElement[] = [
  new PersonElement(new Person('1065642202', 'DANIEL CASTILLO PEDROZA')),
  new PersonElement(new Person('1065784783', 'ADRIAN CASTILLO PEDROZA')),
  new PersonElement(new Person('1066747874', 'FABIAN CASTILLO PEDROZA')),
  new PersonElement(new Person('73172818', 'MILTON CASTILLO MARTINEZ')),
  new PersonElement(new Person('49857331', 'YOMAIRA PEDROZA PAYARES'))
];
