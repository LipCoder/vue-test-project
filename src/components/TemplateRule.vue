<template>
  <!-- # 텍스트 보간법 -->
  <!-- 데이터 바인딩의 가장 기본적인 형태, Mustache(이중 중괄호) 문법을 사용 -->
  <span @click="changeMessage()">
    <!-- 이중 중괄호 내 msg는 해당 컴포넌트 인스턴스의 msg 속성의 값으로 대체 -->
    메시지: {{ msg }}
  </span>

  <!-- # HTML 출력 -->
  <!-- 디렉티브 속성을 사용하면 HTML 출력을 사용할 수 있다. -->
  <!-- v-html은 Vue에서 제공하는 특수한 속성이다. -->
  <!-- HTML을 동적으로 렌더링 하는 경우 XSS 취약점이 쉽게 발생할 수 있어 매우 위험하다. -->
  <!-- 또한, Vue는 문자열 기반 템플릿 엔진이 아니기 때문에, v-html을 사용해 템플릿 일부를 작성할 수 없다. -->
  <p>텍스트 보간법 사용: {{ rawHtml }}</p>
  <p>v-html 디렉티브 사용: <span v-html="rawHtml"></span></p>

  <!-- # 속성 바인딩 -->
  <!-- 이중 중괄호는 HTML 속성 내에서 사용이 불가능하다.  -->
  <!-- 대신 v-bind 디렉티브를 사용한다. -->
  <!-- 만약 바인딩 된 값이 null 혹은 undefined 인 경우, 이 엘리먼트 속성은 제거된 상태로 렌더링 된다. -->

  <!-- 기존 문법(v-bind:) <div v-bind:id="dynamicId"></div> -->
  <!-- 단축된 문법(:) <div :id="dynamicId"></div> -->
  <div :id="dynamicId">{{ dynamicIdMsg }}</div>

  <!-- # 불리언(Boolean) 속성 -->
  <!-- 엘리먼트에 표기했지는지 여부로 참/거짓 값을 나타내는 속성이다. -->
  <!-- isButtonDisabled가 true인 경우 disabled 속성이 나타나고 false 일 경우 생략된다. -->
  <!-- 빈 문자열일 경우 disabled="" 이므로 속성이 표기된다. -->
  <button :disabled="isButtonDisabled">버튼</button>

  <!-- 여러 속성을 동적으로 바인딩 -->
  <!-- 인자 없이 v-bind를 사용해 단일 엘리먼트에 바인딩할 수 있다. -->
  <div v-bind="objectOfAttrs">
    Vue를 이용하면 여러 속성을 객체 타입으로 한꺼번에 바인딩 할 수 있습니다.
  </div>

  <!-- # JavaScript 표현식 사용 -->
  <!-- Vue는 간단한 속성 뿐만 아니라, JavaScript 표현식의 모든 기능을 지원한다. -->
  <div>number + 1 = {{ number + 1 }}</div>
  <div>ok ? '예' : '아니오' = {{ ok ? '예' : '아니오' }}</div>
  <div>
    message.split('').reverse().join('') =
    {{ message.split('').reverse().join('') }}
  </div>
  <div :id="`list-${id}`">you can use in directive attribute</div>

  <!-- 단, 하나의 표현식만 사용 가능하다. ex) return 뒤에 붙는 표현식 -->
  <!-- 이것은 표현식이 아닌 선언식이다. -->
  <!-- <div>{{ var a = 1; }}</div> -->
  <!-- 흐름 제어도 작동하지 않습니다. 삼항 표현식을 사용하라. -->
  <!-- <div>{{ if (ok) {return message;} }}</div> -->

  <!-- ## 함수 호출 -->
  <!-- 바인딩 표현식 내부에서 컴포넌트에 노출하는 메서드를 호출할 수 있다. -->
  <span :title="toTitleDate(date)">
    {{ formatDate(date) }}
  </span>

  <!-- ## 제한된 전역 접근 -->
  <!-- 템플릿 표현식은 샌드박스 처리되어 제한된 전역 리스트에만 접근이 가능하다. -->

  <!-- # 디렉티브 -->
  <!-- 'v-' 접두사로 시작하는 특수한 속성을 디렉티브라고 한다. -->
  <!-- 디렉티브는 vue가 제공한다. -->
  <!-- 빌트 인 디렉티브: v-html, v-bind -->
  <!-- v-if 디렉티브는 불리언 값을 기반으로 <p> 엘리먼트를 삽입 또는 제거한다. -->
  <p v-if="seen">이제 이것을 볼 수 있습니다.</p>
  <!-- v-on 디렉티브의 단축형은 @이다.  -->

  <!-- ## 동적인 인자 -->
  <!-- 디렉티브의 인자를 대괄호로 감싸서 JavaScript 표현식으로 사용할 수도 있다. -->
  <a :[attributeName]="url">{{ url }} 로 바로가기</a>

  <!-- ## 동적인 인자 제약조건 -->
  <!-- 동적인 인자는 null 또는 문자열로 평가되어야 한다. -->
  <!-- null일 경우, 바인딩을 명시적으로 제거한다. 문자열이 아니면 다른 값은 에러를 트리거 한다. -->

  <!-- ## 수식어 -->
  <!-- 수식어는 점(.)으로 시작하는 특수한 접미사로, 디렉티브가 특별한 방식으로 바인딩되어야 함을 나타낸다. -->
  <!-- 예를들어 .prevent 수식어는 트리거된 이벤트에서 event.preventDefault()를 호출하도록 디렉티브에 지시 한다. -->

  <!-- # 전체적으로 시각화한 디렉티브 문법 -->
  <!-- v-on:submit.prevent="onSubmit" -->
  <!-- ---- ------ ------   --------  -->
  <!--  1      2     3          4     -->
  <!-- 이름    인수   수식어       값     -->
  <!-- 1. 이름 : v- 로 시작함. 단축 문법(':', '@') 사용시 생략 가능 -->
  <!-- 2. 인수 : 콜론(:) 또는 단축 문법에 뒤이어 사용 -->
  <!-- 3. 수식어 : 점으로 시작함 -->
  <!-- 4. 값 : JavaScript 표현식으로 해석 -->
</template>

<script>
export default {
  name: 'TemplateRule',
  data() {
    return {
      msg: 'this is message!',
      rawHtml: `<span style="color:red">이것은 빨간색이어야 합니다.</span>`,
      dynamicId: 'dynamicIdExample',
      dynamicIdMsg: 'This tag has ID that comes from directive attribute.',
      isButtonDisabled: true,

      // 여러 속성을 동적으로 바인딩
      // 여러 속성을 나타내는 JavaScript 객체가 있는 경우
      objectOfAttrs: {
        id: 'container',
        class: 'wrapper',
      },

      number: 0,
      ok: true,
      message: 'this is test message',
      id: 'jsExpression',

      date: '2023.2.1',

      seen: true,

      attributeName: 'href',
      url: 'https://www.naver.com',
    };
  },
  methods: {
    changeMessage() {
      this.msg = 'this is changed message!!!';

      alert(this.count);
    },

    toTitleDate(date) {
      return `toTitleDate: ${date}`;
    },

    formatDate(date) {
      return `formatDate: ${date}`;
    },
  },
};
</script>

<style></style>
