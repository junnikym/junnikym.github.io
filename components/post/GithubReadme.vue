<template>
  <div>
    <div class="markdown-body">
      <h1 id="user-content-spring-chat-service-with-websocket-stomp">
    <a class="heading-link" href="#spring-chat-service-with-websocket-stomp">
        Spring Chat Service with WebSocket, STOMP
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h1>
<h2 id="user-content-websocket">
    <a class="heading-link" href="#websocket">
        WebSocket
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h2>
<p>
    TCP 연결을 통해 클라이언트와 서버 사이에 전이중 양방향 통신 (full duplex, 2-way communication); 
    <br>

    HTTP와 다른 TCP 방식으로 작동하지만, HTTP에서 동작 가능하도록 설계되었다.
</p>
<ul>
    <li>
        ref : 
        <a href="https://stackoverflow.com/questions/16945345/differences-between-tcp-sockets-and-web-sockets-one-more-time" rel="nofollow">https://stackoverflow.com/questions/16945345/differences-between-tcp-sockets-and-web-sockets-one-more-time</a>
    </li>
</ul>
<p>HTTP Request를 그대로 사용하기 때문에 기존의 80, 443 포트로 접속을 하므로 추가 방화벽을 열지 않고도 양방향 통신이 가능하고, HTTP 규격인 CORS 적용이나 인증 등.. 과정을 기존과 동일하게 가져갈 수 있다.</p>
<h3 id="user-content-연결-과정">
    <a class="heading-link" href="#연결-과정">
        연결 과정
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<p>
    우선, WebSocket interaction을 시작하기 위해서는 
    <code>Handshake</code>
    를 통해 protocol을 WebSocket 으로 변환해야한다.
    이를 하기위해 HTTP 요청에 
    <code>update</code>
     header를 추가하여 WebSocket Protocol로 변환하는 작업이 필요하다.
</p>
<p>&lt; Switching protocol request &gt;</p>
<div class="highlight highlight-source-yaml">
    <pre>
        <span class="pl-s">GET /localhost/something HTTP/1.1</span>
        <span class="pl-ent">Host</span>
        : 
        <span class="pl-s">localhost:8080</span>
        <span class="pl-ent">Upgrade</span>
        : 
        <span class="pl-s">websocket    -- 1 </span>
        <span class="pl-ent">Connection</span>
        : 
        <span class="pl-s">Upgrade   -- 2 </span>
        <span class="pl-ent">Sec-WebSocket-Key</span>
        : 
        <span class="pl-s">Uc9l9TMkWGbHFD2qnFHltg==</span>
        <span class="pl-ent">Sec-WebSocket-Protocol</span>
        : 
        <span class="pl-s">v10.stomp, v11.stomp</span>
        <span class="pl-ent">Sec-WebSocket-Version</span>
        : 
        <span class="pl-c1">13</span>
        <span class="pl-ent">Origin</span>
        : 
        <span class="pl-s">http://localhost:8080</span>
    </pre>
</div>
<ol>
    <li>WebSocket 으로 변경</li>
    <li>
        connection을 다른 protocol로 변경 (
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Upgrade" rel="nofollow">ref</a>
        )
    </li>
</ol>
<p>&lt; Switching protocol response &gt;</p>
<div class="highlight highlight-source-yaml">
    <pre>
        <span class="pl-s">HTTP/1.1 101 Switching Protocols </span>
        <span class="pl-ent">Upgrade</span>
        : 
        <span class="pl-s">websocket</span>
        <span class="pl-ent">Connection</span>
        : 
        <span class="pl-s">Upgrade</span>
        <span class="pl-ent">Sec-WebSocket-Accept</span>
        : 
        <span class="pl-s">1qVdfYHU9hPOl4JYYNXF623Gzn0=</span>
        <span class="pl-ent">Sec-WebSocket-Protocol</span>
        : 
        <span class="pl-s">v10.stomp</span>
    </pre>
</div>
<h2 id="user-content-websocket-api">
    <a class="heading-link" href="#websocket-api">
        WebSocket API
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h2>
<p>Spring에서는 Client-Side와 Server-Side에서 WebSocket을 사용할 수 있도록 도와주는 API를 제공한다.</p>
<p>&lt; build.gradle &gt;</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-s1">implementation</span>
        <span class="pl-s">'org.springframework.boot:spring-boot-starter-websocket'</span>
    </pre>
</div>
<p>&lt; Config Class &gt;</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">Configuration</span>
        <span class="pl-c1">@</span>
        <span class="pl-c1">EnableWebSocket</span>
        <span class="pl-k">public</span>
        <span class="pl-k">class</span>
        <span class="pl-smi">WebSocketConfig</span>
        <span class="pl-k">implements</span>
        <span class="pl-smi">WebSocketConfigurer</span>
         {

        	
        <span class="pl-k">private</span>
        <span class="pl-k">static</span>
        <span class="pl-k">final</span>
        <span class="pl-smi">String</span>
        <span class="pl-c1">CHAT_WS_PATH</span>
         = 
        <span class="pl-s">"/ws/v1/chat"</span>
        ;

        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">Override</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">void</span>
        <span class="pl-en">registerWebSocketHandlers</span>
         (
        <span class="pl-smi">WebSocketHandlerRegistry</span>
        <span class="pl-s1">registry</span>
        ) {
        		
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">addHandler</span>
        (
        <span class="pl-en">chatWebSocketHandler</span>
        (), 
        <span class="pl-c1">CHAT_WS_PATH</span>
        );
        	}

        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">Bean</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">WebSocketHandler</span>
        <span class="pl-en">chatWebSocketHandler</span>
        () {
        		
        <span class="pl-k">return</span>
        <span class="pl-k">new</span>
        <span class="pl-smi">ChatHandler</span>
        ();
        	}

        }
    </pre>
</div>
<p>&lt; WebSocket Handler &gt;</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-k">public</span>
        <span class="pl-k">class</span>
        <span class="pl-smi">ChatHandler</span>
        <span class="pl-k">extends</span>
        <span class="pl-smi">TextWebSocketHandler</span>
         {

        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">Override</span>
        <span class="pl-k">protected</span>
        <span class="pl-smi">void</span>
        <span class="pl-en">handleTextMessage</span>
        (
        <span class="pl-smi">WebSocketSession</span>
        <span class="pl-s1">session</span>
        , 
        <span class="pl-smi">TextMessage</span>
        <span class="pl-s1">message</span>
        ) 
        <span class="pl-k">throws</span>
        <span class="pl-smi">Exception</span>
         {
        		
        <span class="pl-en">super</span>
        .
        <span class="pl-en">handleTextMessage</span>
        (
        <span class="pl-s1">session</span>
        , 
        <span class="pl-s1">message</span>
        );
        	}

        }
    </pre>
</div>
<p>
    다음과 같이 
    <code>TextWebSocketHandler</code>
     Class를 상속받아 Handler를 구성한 뒤
    <code>addHandler</code>
     메소드를 통해 Configuration에 등록 시켜주면 쉽게 WebSocket Server를 구현할 수 있다.
</p>
<p>
    이 외에도 
    <code>WebSocketHandler</code>
    나 
    <code>BinaryWebSocketHandler</code>
     등.. 의 Handler를 상속을 수도 있다.
</p>
<h3 id="user-content-handshake">
    <a class="heading-link" href="#handshake">
        Handshake
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<p>
    <code>WebSocketRegisterHandler</code>
    의 
    <code>addInterceptors</code>
     메소드를 통해 Handshake의 Before와 After를 위한 메소드를 사용할 수 있다.
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-s1">register</span>
        .
        <span class="pl-en">addInterceptors</span>
        (
        <span class="pl-k">new</span>
        <span class="pl-smi">HttpSessionHandshakeInterceptor</span>
        ());
    </pre>
</div>
<p>
    실제로 
    <code>HttpSessionHandshakeInterceptor</code>
     클래스 코드를 보면 
    <code>HandshakeInterceptor</code>
    를 상속받아
    <code>beforeHandshake</code>
    와 
    <code>afterHandshake</code>
    를 Override 하여 구현한 것을 확인할 수 있다.
</p>
<blockquote>
    <p>
        HttpSessionHandshakeInterceptor 
        <br>

        해당 Interceptor를 통해 HttpSession에 접속하고 해당 내용을 WebSocketHandler에 전달할 수 있다.
    </p>
</blockquote>
<h3 id="user-content-server-configuration">
    <a class="heading-link" href="#server-configuration">
        Server Configuration
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<p>
    메세지 버퍼 크기, 유휴 시간 초과 등 런타임 특성을 
    <code>ServletServerContainerFactoryBean</code>
    를 통해 제어할 수 있다.
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">Bean</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">ServletServerContainerFactoryBean</span>
        <span class="pl-s1">createWebSocketContainer</span>
        (){
            
        <span class="pl-smi">ServletServerContainerFactoryBean</span>
        <span class="pl-s1">container</span>
         = 
        <span class="pl-k">new</span>
        <span class="pl-smi">ServletServerContainerFactoryBean</span>
        ();
            
        <span class="pl-s1">container</span>
        .
        <span class="pl-en">setMaxTextMessageBufferSize</span>
        (
        <span class="pl-c1">8192</span>
        );
            
        <span class="pl-s1">container</span>
        .
        <span class="pl-en">setMaxBinaryMessageBufferSize</span>
        (
        <span class="pl-c1">8192</span>
        );
            
        <span class="pl-k">return</span>
        <span class="pl-s1">container</span>
        ;
        }
    </pre>
</div>
<h3 id="user-content-origins">
    <a class="heading-link" href="#origins">
        Origins
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<p>Spring Framework 4.1.5를 기준으로 WebSocket의 기본동작은 동일한 오리진 요청만 수락하는 것이다.</p>
<p>
    <code>WebSocketRegisterHandler</code>
    의 
    <code>setAllowedOrigins</code>
     메소드를 통해 Allow Origin을 설정할 수 있다.
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">setAllowedOrigins</span>
        (
        <span class="pl-s">"*"</span>
        );

            
        <span class="pl-smi">or</span>

        <span class="pl-s1">registry</span>
        .
        <span class="pl-s1">setAllowedOrigins</span>
        (
        <span class="pl-s">"https://somedomain.com"</span>
        );
    </pre>
</div>
<h2 id="user-content-sockjs">
    <a class="heading-link" href="#sockjs">
        SockJS
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h2>
<p>
    WebSocket 통신을 모든 브라우저에서 지원하지는 않는다. 
    <br>

    Server와 Client 중간에 위치한 Proxy가 Upgrade헤더를 해석하지 못해 서버에 전달하지 못할 수 있으며 
    <br>

    오랜시간 Idle 상태로 지속된 Connection이 지워질 수 있다.
</p>
<p>
    이러한 경우 WebSocket을 대체하기위해 다른 방식을 사용하여 통신을 지속해야한다. 이때, 
    <code>WebSocket Emulation</code>
    을 이용하여
    <code>Http Streaming</code>
    , 
    <code>Long Pulling</code>
    과 같은 Http 기반의 방식으로 WebSocket과 같은 흉내를 낼 수 있다.
</p>
<blockquote>
    <p>
        Javascript 진영의 
        <code>Socket.io</code>
        와 같은 개념이다.
    </p>
</blockquote>
<p>
    SockJS를 적용하기위해서는 Configuration에서 WebSocketHandler를 등록할때 
    <code>withSockJS()</code>
     멤버 메소드를 사용하여 적용이 가능하다.
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">Override</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">void</span>
        <span class="pl-s1">registerWebSocketHandlers</span>
         (
        <span class="pl-smi">WebSocketHandlerRegistry</span>
        <span class="pl-s1">registry</span>
        ) {
            
        <span class="pl-s1">registry</span>

                    .
        <span class="pl-en">addHandler</span>
        (
        <span class="pl-en">chatWebSocketHandler</span>
        (), 
        <span class="pl-c1">CHAT_WS_PATH</span>
        )
                    .
        <span class="pl-en">setAllowedOrigins</span>
        (
        <span class="pl-s">"*"</span>
        )
                    .
        <span class="pl-en">addInterceptors</span>
        (
        <span class="pl-k">new</span>
        <span class="pl-smi">HttpSessionHandshakeInterceptor</span>
        ())
                    .
        <span class="pl-en">withSockJS</span>
        ();  
        <span class="pl-c">// &lt;- 적용</span>

        }
    </pre>
</div>
<p>(더 다양한 환경에서 SockJS 설정방법은 아래 링크를 참고)</p>
<ul>
    <li>
        ref : 
        <a href="https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/web.html#websocket-fallback" rel="nofollow">https://docs.spring.io/spring-framework/docs/5.2.6.RELEASE/spring-framework-reference/web.html#websocket-fallback</a>
    </li>
</ul>
<h2 id="user-content-stomp">
    <a class="heading-link" href="#stomp">
        STOMP
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h2>
<p>
    <code>STOMP</code>
    <sub>
        <code>Simple Text Oriented Messaging Protocol</code>
    </sub>
    는 메시지를 효율적으로 전송하기 위해 탄생한 프로토콜이다.
    WebSocket 위에서 돌아가는 프로토콜이며 서버가 전송할 메시지의 유형, 형식, 내용을 정의하는 메커니즘이며 
    <code>pub/sub</code>
     구조로 동작.
</p>
<p>
    메시지 전송을 위한 프로토콜 (AMQP, MQTT, ..) 은 존재하지만 
    <code>STOMP</code>
    와 차이점은 Binary가 아닌 
    <code>Text 기반</code>
    의 프로토콜이라는 점이다.
</p>
<ul>
    <li>
        ref : 
        <a href="https://velog.io/@qkrqudcks7/STOMP%EB%9E%80" rel="nofollow">https://velog.io/@qkrqudcks7/STOMP란</a>
    </li>
    <li>
        ref : 
        <a href="https://warpgate3.tistory.com/entry/STOMPSimpleStream-Text-Oriented-Message-Protocol" rel="nofollow">https://warpgate3.tistory.com/entry/STOMPSimpleStream-Text-Oriented-Message-Protocol</a>
    </li>
</ul>
<p>STOMP는 only WebSocket 만을 위한 프로토콜은 아니다. 다른 몇몇 양방향 통신에서도 활용가능하다.</p>
<p>WebSocket은 Binary, Text 타입의 메시지를 주고 받을 수 있지만, 따로 형식이 정해진것은 아니다.
그렇기 때문에 따로 주고받을 메시지에 대한 형식을 정해야하며 파싱로직 또한 구현을 해줘야한다.</p>
<p>Spring에서 STOMP를 사용하면 좋은점은 다음과 같다.</p>
<ol>
    <li>하위 프로토콜, 컨벤션을 따로 정의할 필요 없다.</li>
    <li>연결 주소마다 새로운 Handler를 구현하고 설정해줄 필요 없다.</li>
    <li>Spring Security를 사용할 수 있다.</li>
    <li>외부 Messaging Queue를 사용할 수 있다.</li>
</ol>
<ul>
    <li>
        ref : 
        <a href="https://velog.io/@guswns3371/WebSocket-Spring" rel="nofollow">https://velog.io/@guswns3371/WebSocket-Spring</a>
    </li>
</ul>
<h3 id="user-content-frame">
    <a class="heading-link" href="#frame">
        Frame
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<p>STOMP에서 통신 시 쓰이는 Frame은 다음과 같다</p>
<pre>
    <code>COMMAND         | SEND, SUBSCRIBE 등.. 명령
                    |
    header1:value1  | REST의 Header와 같이
    header2:value2  | 부가 정보를 나타냄
                    |
    Body^@          | 매시지 내용
    </code>
</pre>
<h3 id="user-content-flow">
    <a class="heading-link" href="#flow">
        Flow
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<p>
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">Configuration</span>
        <span class="pl-c1">@</span>
        <span class="pl-c1">EnableWebSocketMessageBroker</span>
        <span class="pl-k">public</span>
        <span class="pl-k">class</span>
        <span class="pl-smi">WebSocketBrokerConfig</span>
        <span class="pl-k">implements</span>
        <span class="pl-smi">WebSocketMessageBrokerConfigurer</span>
         {

        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">Override</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">void</span>
        <span class="pl-en">configureMessageBroker</span>
        (
        <span class="pl-smi">MessageBrokerRegistry</span>
        <span class="pl-s1">registry</span>
        ) {
        		
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">enableSimpleBroker</span>
        (
        <span class="pl-s">"/queue"</span>
        ,
        <span class="pl-s">"/topic"</span>
        );
        		
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">setApplicationDestinationPrefixes</span>
        (
        <span class="pl-s">"/app"</span>
        );
        	}

        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">Override</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">void</span>
        <span class="pl-en">registerStompEndpoints</span>
        (
        <span class="pl-smi">StompEndpointRegistry</span>
        <span class="pl-s1">registry</span>
        ) {
        		
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">addEndpoint</span>
        (
        <span class="pl-s">"/blar-blar"</span>
        )
        				.
        <span class="pl-en">withSockJS</span>
        ();
        	}

        }
    </pre>
</div>
<p>
    Configuration Class에 
    <code>@EnableWebSocketMessageBroker</code>
     적용과 
    <code>WebSocketMessageBrokerConfigurer</code>
     상속을 해줌으로써
    STOMP에 대한 설정을 할 수 있다.
</p>
<ul>
    <li>
        configureMessageBroker : Message Broker에 대한 설정이다.
        <ul>
            <li>
                enableSimpleBroker - 해당 메소드를 통해 내장 브로커를 사용할 수 있다.
                <ul>
                    <li>해당 메소드를 통해 prefix url을 설정해주면, prefix를 가진 url로 메시지가 발행될 때 브로커가 이를 처리해준다.</li>
                </ul>
            </li>
            <li>setApplicationDestinationPrefixes - Message Handler로 routing 되는 prefix url</li>
        </ul>
    </li>
    <li>
        registerStompEndpoints : WebSocket의 addHandler와 유사하다.
        <ul>
            <li>addEndpoint - 해당 메소드를 통해 WebSocket Handshaking이 진행된다.</li>
            <li>withSockJS - WebSocket에서 withSockJS()와 동일하다.</li>
        </ul>
    </li>
</ul>
<ul>
    <li>
        단 registerStompEndpoints와 같은 경우 Configuration 에서 지정할 필요없이 
        <code>Controller</code>
        에서 지정이 가능하다
    </li>
</ul>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">Controller</span>
        <span class="pl-k">public</span>
        <span class="pl-k">class</span>
        <span class="pl-smi">ChatController</span>
         {

        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">MessageMapping</span>
        (
        <span class="pl-s">"/hi"</span>
        )
        	
        <span class="pl-c1">@</span>
        <span class="pl-c1">SendTo</span>
        (
        <span class="pl-s">"/topic/hi"</span>
        )
        	
        <span class="pl-k">public</span>
        <span class="pl-smi">String</span>
        <span class="pl-en">hi</span>
        (
        <span class="pl-smi">String</span>
        <span class="pl-s1">message</span>
        ) 
        <span class="pl-k">throws</span>
        <span class="pl-smi">Exception</span>
         {
        		
        <span class="pl-k">return</span>
        <span class="pl-s">"hi! "</span>
         + 
        <span class="pl-s1">message</span>
        ;
        	}

        }
    </pre>
</div>
<p>
    <code>@MessageMapping</code>
    에 설정된 url을 호출 시 
    <code>Broadcast</code>
    로 보내지며, 
    <br>
    <code>@SendTo</code>
    에 설정된 url을 호출 시 
    <code>Subscriber</code>
    에게 전달된다.
</p>
<p>
    Client와 관련된 코드는 
    <a href="https://spring.io/guides/gs/messaging-stomp-websocket/" rel="nofollow">여기</a>
     에서 얻을 수 있었다
</p>
<ul>
    <li>
        ref : 
        <a href="https://velog.io/@guswns3371/WebSocket-Spring" rel="nofollow">https://velog.io/@guswns3371/WebSocket-Spring</a>
    </li>
</ul>
<p>
</p>
<h3 id="user-content-destination-variable">
    <a class="heading-link" href="#destination-variable">
        Destination Variable
        <span aria-hidden="true" class="octicon octicon-link"></span>
    </a>
</h3>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">MessageMapping</span>
        (
        <span class="pl-s">"hi/{to}"</span>
        )
        <span class="pl-k">public</span>
        <span class="pl-smi">String</span>
        <span class="pl-s1">hi</span>
        (
        <span class="pl-smi">HiDto</span>
        <span class="pl-s1">message</span>
        ) 
        <span class="pl-k">throws</span>
        <span class="pl-s1">Exception</span>
         {
            
        <span class="pl-k">return</span>
        <span class="pl-s">"안녕! "</span>
         + 
        <span class="pl-s1">message</span>
        .
        <span class="pl-en">getName</span>
        ();
        }
    </pre>
</div>
<p>
    다음과 같이 
    <code>Placeholder</code>
    를 설정하여 보내고자하는 대상을 나눌 수 있다.
</p>
<p>
    만약 
    <code>/topic/hi/a</code>
    를 subscribe 했다면 
    <code>app/hi/a</code>
    를 해야만 메시지를 얻을 수 있다.
    <br>
    <code>app/hi/b</code>
    와 같이 발송을 했다면 메시지를 받지 못한다.
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">MessageMapping</span>
        (
        <span class="pl-s">"hi/{to}"</span>
        )
        <span class="pl-k">public</span>
        <span class="pl-smi">String</span>
        <span class="pl-s1">hi</span>
        (
        <span class="pl-c1">@</span>
        <span class="pl-c1">DestinationVariable</span>
        (
        <span class="pl-s">"to"</span>
        ) 
        <span class="pl-smi">String</span>
        <span class="pl-s1">to</span>
        , 
        <span class="pl-smi">HiDto</span>
        <span class="pl-s1">message</span>
        ) 
        <span class="pl-k">throws</span>
        <span class="pl-s1">Exception</span>
         {
            
        <span class="pl-k">return</span>
        <span class="pl-s">"안녕! "</span>
         + 
        <span class="pl-s1">message</span>
        .
        <span class="pl-en">getName</span>
        () + 
        <span class="pl-s">"("</span>
         + 
        <span class="pl-s1">to</span>
         + 
        <span class="pl-s">")"</span>
        ;
        }
    </pre>
</div>
<p>
    다음과 같이 
    <code>@DestinationVariable</code>
     어노테이션으로 Parameter를 받는다면 
    <code>Placeholder</code>
    의 데이터를 변수를 통해 알 수 있다.
</p>
<div class="highlight highlight-source-java">
    <pre>
        <span class="pl-c1">@</span>
        <span class="pl-c1">Override</span>
        <span class="pl-k">public</span>
        <span class="pl-smi">void</span>
        <span class="pl-s1">configureMessageBroker</span>
        (
        <span class="pl-smi">MessageBrokerRegistry</span>
        <span class="pl-s1">registry</span>
        ) {
            
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">setPathMatcher</span>
        (
        <span class="pl-k">new</span>
        <span class="pl-smi">AntPathMatcher</span>
        (
        <span class="pl-s">"."</span>
        ));
            
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">enableSimpleBroker</span>
        (
        <span class="pl-s">"/queue"</span>
        ,
        <span class="pl-s">"/topic"</span>
        );
            
        <span class="pl-s1">registry</span>
        .
        <span class="pl-en">setApplicationDestinationPrefixes</span>
        (
        <span class="pl-s">"/app"</span>
        );
        }
    </pre>
</div>
<p>
    Configuration 중, 
    <code>setPathMatcher</code>
     메소드를 통해 
    <code>'.'를 통해 분리한다</code>
    라는 설정을 해주면
    path를 
    <code>@MessageMapping("hi.{to}")</code>
    와 같이 설정이 가능하다.
</p>
<ul>
    <li>
        <code>@SendTo</code>
         어노테이션은 해당 기능을 지원하지 않는다.
    </li>
</ul>
<p>
</p>
    </div>
  </div>
</template>

<script>

import axios from "axios";

// LearningTDD/main/README.md
const username = "junnikym";
const githubRawContent = "https://raw.githubusercontent.com";

export default {
  props: {
    repoName: {
      type: String,
      default: null
    },
    branchName: {
      type: String,
      default: 'main'
    },
    path: {
      type: String,
      default: "README.md"
    }
  },

  data() {
    return {
      readmeText: "",
    }
  },

  created() {
    this.loadGithubReadme();
  },

  methods: {
    async loadGithubReadme() {
      const readmeLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.renderMarkdown(res.data)
      }

      const readmeLoadErr = (err)=>{
        console.error(err);
      }

      axios.get(`${this.getRawContentUrl()}/${this.path}`)
      .then(readmeLoadThen)
      .catch(readmeLoadErr);
    },

    async renderMarkdown(markdown) {
      const renderMarkdownLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.readmeText = this.imageParser(res.data);
      }

      const renderMarkdownLoadErr = (err)=>{
        console.error(err);
      }

      await axios.post(
        "https://api.github.com/markdown", 
        {
          text: markdown
        },
        {
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `${process.env.GITHUB_API_KEY}`,
            "X-GitHub-Api-Version": "2022-11-28",
          }
        }
      )
      .then(renderMarkdownLoadThen)
      .catch(renderMarkdownLoadErr);
    },

    getRawContentUrl() {
      return `${githubRawContent}/${username}/${this.repoName}/${this.branchName}`
    },

    imageParser(htmlString) {
      let path = this.path.split("/")
      path.pop()
      if(path.length > 0)
        path = path.reduce((acc, value)=> acc+"/"+value)
      else
        path = ''


      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString, 'text/html');
      const images = dom.getElementsByTagName("img")
      if(!images)
        return htmlString
      
      Array.from(images).map(it=> {
        const src = `${this.getRawContentUrl()}/${path}/${it.getAttribute("src")}`
        it.setAttribute("src", src)
      })

      return (new XMLSerializer()).serializeToString(dom);
    }
  },

  computed: {
    changeMarkdown() {
    }
  }

}

</script>