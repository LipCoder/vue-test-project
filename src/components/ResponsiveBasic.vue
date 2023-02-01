<template>
  <div>Current Number: {{ count }}</div>
  <!-- click 이벤트(@) 가 발생하면 increment 함수를 호출한다. -->
  <button @click="increment">숫자 증가</button>

  <div>{{ obj }}</div>
  <button @click="mutateDeeply">깊은 반응형 동작</button>
</template>

<script>
import { nextTick } from 'vue';

/**
 * 반응형 상태 설정
 *
 * 옵션 API에서는 data 옵션을 사용해 컴포넌트의 반응형 상태를 선언합니다. (data())
 * 옵션 값은 객체를 반환하는 함수여야 한다. (return)
 *
 * Vue는 새 컴포넌트 인스턴스를 만들 때 함수를 호출하고, 반환된 객체를 반응형 시스템에 래핑한다.
 * (Vue에서 반응형이란? 데이터가 변경되었을 때 이를 감지하고 이에 반응하여 부가적인 동작을 수행하기 위한 성질)
 *
 * 객체의 요소는 인스턴스를 만들때에만 생성되므로, 당장 사용하지 않더라도 null, undefined로 미리 선언해놔야 한다.
 *
 * 반응형 API는 접두사로 '$'와 '_'를 사용하기 때문에 최상위 속성명은 이러한 문자를 사용하면 안된다.
 *
 * */
export default {
  // # 반응형 상태 설정
  // 인스턴스 만들 때 호출
  data() {
    // 해당 객체를 반응형 시스템에 래핑
    return {
      count: 0,

      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar'],
      },
    };
  },
  // ## 메서드 상태 유지
  // 어떤 경우에는 메서드 함수를 동적으로 생성해야 할 수도 있다.
  // 각 컴포넌트 인스턴스의 디바운스된 함수를 각각 독립적으로 유지하기 위해
  // created 수명 주기 훅에서 디바운스된 함수를 컨트롤 할 수 있는 환경을 구성할 수 있다.
  // created() {
  //   // 이제 각 인스턴스는 자체적인 디바운스된 핸들러를 가진다.
  //   this.debounceClick = this.debounce(this.click, 500);
  // },
  // unmounted() {
  //   // 컴포넌트가 제거된 후
  //   // 타이머를 취소하는 것은 좋은 방법이다.
  //   this.debounceClick.cancel();
  // },
  // 'mounted' 는 수명 주기 훅이다.
  mounted() {
    console.log(this.count);
    // 반응형 객체는 반드시 this를 이용하여 속성이 접근해야 한다.
    this.count = 1;
  },

  // # 메서드 선언
  // 'methods' 는 메서드 선언이다.
  // 직접 정의한 메서드를 정의한다
  methods: {
    increment() {
      // Vue는 methods에서 this가 컴포넌트 인스턴스를 참조하도록 항상 자동으로 바인딩 한다.
      this.count++;

      // ## DOM 업데이트 시기
      // 반응형 상태를 변경하면 DOM이 자동으로 업데이트 된다.
      // 그러나 DOM 업데이트는 동기적으로 적용되지 않는다는 점에 유의해야 한다.
      // Vue 에서는 다음 틱(tick) 까지 버퍼링하여
      // 상태 변경을 여러 번 수행했어도 각 컴포넌트가 한 번만 업데이트되도록 한다.

      // 상태 변경 후, DOM 업데이트가 완료될 때까지 기다리려면 nextTick() 전역 API를 사용할 수 있다.
      nextTick(() => {
        // 업데이트 된 DOM에 접근 가능
        console.log(`updated count value is ${this.count}`);
      });
    },
    // 화살표 함수 내에서는 this를 사용할 수 없으므로 methods 정의는 이 방법을 피해야 한다.
    incrementByArrowFunction: () => {
      // 여기서는 'this'에 접근할 수 없습니다.
    },

    // ## 깊은 반응형
    // Vue는 기본적으로 반응형 상태를 내부 깊숙히 추적하므로, 중첩된 객체나 배열을 변경할 때에도
    // 변경사항이 감지된다.
    mutateDeeply() {
      // 변경 사항이 감지된다.
      this.obj.nested.count++;
      this.obj.arr.push('baz');
    },
  },
};
</script>

<style></style>
