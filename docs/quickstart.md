# Quick start

!> An awesome project's another page.

## Tabs

<!-- tabs:start -->

#### ** English **

Hello!

#### ** French **

Bonjour!

#### ** Italian **

Ciao!

<!-- tabs:end -->

<!-- tabs:start -->

<!-- tab:Kotlin -->
```kotlin
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
```swift
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

## Diagrams

```plantuml
A -> B: Foo
```
