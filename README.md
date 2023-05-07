#### GLOBAL 

```
npm install -g @aikosia/asterisker
```

#### LOCAL

```
npm install @aikosia/asterisker
```

Assume you have this on your package.json

```
dependencies:{
    @aikosia/automaton-core: ^1.0.0
    @aikosia/automaton-client: ^1.0.0
}
```

And then, those two packages have a new release 

1. @aikosia/automaton-core v1.1.0 
2. @aikosia/automaton-client v1.2.0 

on your root working directory, you can run:

```
asterisker @aikosia/automaton-core @aikosia/automaton-cli
```

to update those two packages to the new release.

package.json will be updated to:

```
dependencies:{
    @aikosia/automaton-core: ^1.1.0
    @aikosia/automaton-client: ^1.2.0
}
```

#### NPX

```
npx @aikosia/asterisker express mongodb
```

or you can using like this:

on package.json add asterisker field with array type

```
{
    asterisker:["express","mongodb"]
}
```

and then run:

```
npx @aikosia/asterisker -l
```



