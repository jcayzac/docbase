---
description: A brief introduction
---

# Quick start

{{description}}

!> An awesome project's another page.

Here's some math:

$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$

## Tabs

### Examples

<!-- tabs:start -->

#### **English**

Hello!

#### **French**

Bonjour!

#### **Italian**

Ciao!

<!-- tabs:end -->

### Code

<!-- tabs:start -->

<!-- tab:Kotlin -->
```kotlin {highlight:"2,10"}
launch {
  val request = Client.Request("{...JSON configuration...}").apply {
    // Configure handler for error messages
    errorMessageHandler = ErrorMessageHandler(myLogger)

    // Configure supported image types
    supportedImageTypes = setOf("image/png", "image/webp")
  }

  request.send(ctx).success?.let {
    // Start using the client
    useClient(it)
  }
}
```

<!-- tab:Swift -->
```swift {highlight:"1,7"}
var request = ClientRequest(configuration: "{...JSON configuration...}")
request.errorMessageHander = { message in
  print("*** ERROR: \(message)")
}
request.supportedImageTypes = ["image/png", "image/webp"]

request.send { result in
  switch result {
    case let .failure(error):
      print("Client request error: \(error.localizedDescription)")
      break
    case let .success(client):
      // Save the reference
      useClient(client)
      break
  }
}
```

<!-- tabs:end -->

The tabs are synchronized, and persisted in local storage.

<!-- tabs:start -->

<!-- tab:Kotlin -->
```kotlin
val message = "This is Kotlin"
```

<!-- tab:Swift -->
```swift
let message = "This is Swift"
```

<!-- tabs:end -->

## Diagrams

### Sequence

```mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
```

### State Diagram

```mermaid
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
```

### Pie Chart

```mermaid
pie
title Key elements in Product X
"Dogs" : 386
"Cats" : 85
"Rats" : 15
```

### Class Diagram

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<interface>> Class01
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
```

### Gantt Chart

```mermaid
gantt
section Section
Completed :done,    des1, 2014-01-06,2014-01-08
Active        :active,  des2, 2014-01-07, 3d
Parallel 1   :         des3, after des1, 1d
Parallel 2   :         des4, after des1, 1d
Parallel 3   :         des5, after des3, 1d
Parallel 4   :         des6, after des4, 1d
```
