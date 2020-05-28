![Bundler](https://images.velog.io/images/eastshine94/post/34b76c93-a40d-41be-843d-220cd6ab3dde/Bundle.png)
> 참고 자료 : 
https://www.youtube.com/watch?v=cp_MeXO2fLg&list=PLuHgQVnccGMChcT9IKopFDoAIoTA-03DA&index=1 ,
https://opentutorials.org/course/743/4750 ,
https://webpack.js.org/



## 1. 번들러(Bundler) 사용 이전의 웹 사이트

**번들러에 대해 알아보기 전에 번들러가 나오게 된 계기에 대해 살펴보아야 합니다.**

초기의 웹 애플리케이션의 규모는 지금과 같이 크지 않았습니다. 그러나 기술의 발전으로 컴퓨터 성능이 좋아지고, 네트워크 속도도 빨라지면서 자연스럽게 웹 애플리케이션의 규모 또한 커져갔습니다. 이로 인해 파일의 양은 점차 늘어났고, 그에 따라 다양한 문제를 야기하였습니다. 

### 1) 중복된 이름으로 인한 에러

대규모의 웹 페이지의 경우, 수 백, 수 천개의 Javascript 파일이 있고, 여러 사람이 관리하다보니 함수명이나 변수명을 똑같이 짓는 일이 일어날 수 있습니다. 하지만 이러한 경우 예상치 못한 에러가 발생할 수 있습니다.

다음과 같은 파일이 있다고 가정합니다.

**index.html**
```
<head>
    <script src="./source/hello.js"></script>
    <script src="./source/world.js"></script>
</head>
<body>
    <h1>Hello, Webpack</h1>
    <div id="root"></div>
    <script type="module">
        document.querySelector("#root").innerHTML = word;
    </script>
</body>
```
**hello.js**
```
var word = "Hello";
```
**world.js**
```
var word = "World";
```

위와 같은 경우 hello.js와 world.js 둘 다 word 변수를 가지고 있어 충돌이 일어납니다.

**실행 결과**
![](https://images.velog.io/images/eastshine94/post/1a4430bc-f1a1-40d7-bbf7-6f67b9d9d586/result.PNG)

실행 결과 hello.js보다 뒤에 load된 world.js의 word 값인 **World**만 출력되는 것을 확인할 수 있습니다. 이처럼 함수명이나 변수명이 중복되면, 의도치 않은 함수나 변수가 삽입되는 에러가 발생합니다.

### 2) 파일로 인한 문제

사용자가 요청을 하면 서버는 웹 애플리케이션을 구성하는 파일들을 보내게 됩니다. 웹 애플리케이션를 구성하는 파일의 양이 많다면, 사용자의 요청에 응답하는 시간이 길어지게 됩니다. 

서버가 파일 1개를 요청하고 응답하는데 1초가 걸린다고 가정합니다. 그럴 경우 100개의 파일을 응답하는 데 100초, 1000개의 파일을 응답하는 데 1000초의 시간이 걸리게 됩니다.

거기에 수많은 사용자가 웹 사이트를 이용할 경우, 응답을 제때 하지 못해 네트워크 병목현상이 일어날 수 있습니다.

만약 파일의 양을 줄이기 위해 하나의 JS 파일에 모든 변수, 함수를 추가한다고 하면 속도 면에선 빨라져 네트워크 병목 현상을 피할 수 있을 것입니다. 하지만 개발자의 입장에선 수 천, 수 만줄의 코드를 유지보수 해야 하기 때문에 가독성 면에서 지옥이 따로 없을 것입니다. 

이처럼 가독성, 유지 보수를 위해 파일을 분리하면 네트워크 병목현상이 일어날 것이고, 응답 시간을 위해 파일 수를 줄이면 가독성, 유지 보수가 힘들어지는 딜레마에 빠지게 됩니다. 그렇다면 두 마리 토끼를 다 잡는 방법은 없을까요? 

## 2. 번들러(Bundler)

이와 같은 문제들을 해결하기 위해 **번들러(Bundler)** 가 등장하였습니다. 번들러를 간단히 설명하면, 여러개의 파일을 하나의 파일로 묶어주는 역할을 한다고 말할 수 있습니다. 번들러는 대표적으로 webpack, parcel, browserify가 있습니다. 저는 주로 사용되고 있는 **webpack**을 중심으로 살펴보겠습니다.

![webpack](https://images.velog.io/images/eastshine94/post/4437aea2-246f-4a22-a7cb-0c1875bf83d3/webpack.PNG)

위의 그림은 [webpack](https://webpack.js.org/)을 설명해주는 그림입니다. webpack 공식 홈페이지를 살펴보면 webpack은 다음과 같이 정의되어 있습니다. 

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.


이를 요약하여 해석해보면, webpack은 애플리케이션에 필요한 모든 **모듈**을 알아서 매핑하며, 매핑 된 결과를 가지고 하나 이상의 번들(파일 묶음)을 생성한다는 것 입니다. 이를 이해하기 위해선 모듈의 개념을 알아야 합니다.


## 3. 모듈

모듈의 사전적 정의는 다음과 같습니다.
> 프로그램 내부를 기능별 단위로 분할한 부분

Javascript에서 말하는 모듈도 마찬가지입니다. 웹 애플리케이션을 구성하는 기능들을 분할한 단위라고 생각하면 됩니다. 즉, 코드를 여러개의 파일로 분리하는 것입니다. 이를 간단히 살펴보겠습니다.


**hello.js**

```
var word = "Hello";

export default word;
```

**world.js**


```
var word = "World";

export default word;
```

**index.html**
```
<body>
    <h1>Hello, Webpack</h1>
    <div id="root"></div>
    <script type="module">
        import hello_word from './source/hello.js';
        import world_word from './source/world.js';
        document.querySelector("#root").innerHTML = hello_word + " " + world_word;
        
    </script>
</body>
```

위 코드를 보면 hello.js와 world.js 모듈이 각각 word를 export합니다. 이를 index.html은 hello_word와 world_word로 import하여 사용하고 있습니다. 이렇게 모듈을 사용하면 다음과 같은 효과를 얻을 수 있습니다.

- 자주 사용되는 코드를 별도의 파일로 만들어서 필요할 때마다 재활용할 수 있다.
- 코드를 개선하면 이를 사용하고 있는 모든 애플리케이션의 동작이 개선된다.
- 코드 수정 시에 필요한 로직을 빠르게 찾을 수 있다.
- 필요한 로직만을 로드해서 메모리의 낭비를 줄일 수 있다.
- 한번 다운로드된 모듈은 웹브라우저에 의해서 저장되기 때문에 동일한 로직을 로드 할 때 시간과 네트워크 트래픽을 절약 할 수 있다. (브라우저에서만 해당)

## 4. 번들러 장점

다시 번들러로 돌아와서 이를 사용하면 뭐가 좋은지 살펴보겠습니다.

### 1) 네트워크 병목현상 해결


**번들링 하기 전**
![](https://images.velog.io/images/eastshine94/post/0c8cc456-d305-4b69-955d-989036b03cd8/%EB%B2%88%EB%93%A4%EC%A0%84.PNG)

**번들링 한 후**
![](https://images.velog.io/images/eastshine94/post/decff3a9-641e-4f1e-9918-a3f529d34ac7/%EB%B2%88%EB%93%A4%ED%9B%84.PNG)

이처럼 번들러는 여러 파일을 하나의 파일로 묶어서 보낼 수 있습니다. 또한 번들러는 여러개의 파일들을 묶어 하나의 번들로 만들어 줄 때, 종속성을 알아서 확인하여 사용하지 않은 파일은 포함하지 않습니다. 그에 따라, 파일의 크기를 줄여 페이지 로딩을 빠르게 하는 효과를 발휘합니다. 이를 통해 네트워크 병목현상을 최소화 할 수 있습니다.


### 2) 모듈 단위 코딩

앞에서 이야기 한 것 같이 번들러를 사용하면 모듈 단위의 코딩이 가능합니다. 모듈 단위 코딩을 하게 되면 각 모듈이 독립적인 공간임으로 앞서 문제가 되었던 중복된 이름으로 인해 예상치 못한 에러가 발생하는 것을 막을 수 있습니다. 

또한, 모듈 단위로 기능을 구분하여 코딩이 가능하기 때문에 코드의 가독성이나, 유지보수를 신경쓰며 코딩을 할 수 있습니다.



### 3) ES6 버전 이상의 스크립트를 사용 가능

webpack은 로더(babel-loader)를 통해 Babel이라는 ES6 이상의 자바스크립트 문법을 ES5 버전의 자바스크립트 문법으로 변환시켜주는 트랜스파일러를 사용할 수 있습니다. 이를 통해 ES5만 지원하는 오래된 브라우저에서도 ES6 이상의 문법으로 이루어진 JS 파일을 작동할 수 있게 해줍니다. 

### 4) SASS를 사용 가능

webpack은 style-loader와 css-loader, sass-loader라는 로더를 사용하여 SASS를 CSS로 컴파일하여 사용할 수 있게 만들어줍니다.


## 5. 요약

기술의 발전으로 웹 사이트의 규모가 커지면서 다양한 문제가 발생하였습니다. 이를 해결하기 위해 등장한 것이 Bundler입니다. 

Bundler를 사용하게 되면 네트워크 병목 현상을 해결하고, 모듈 단위의 코딩을 통해 가독성과 유지보수 효율을 높일 수 있습니다. 또한, 로더를 통해 ES6, SASS 등을 변환하여 오래된 브라우저에서도 해당 문법을 읽을 수 있도록 해줍니다.