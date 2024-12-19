# Java.lang 패키지

- 가장 기본이 되는 패키지
- 기본이니 ```import```없이 사용 가능(System.out이 대표적)

## Object

- 모든 클래스의 조상 클래스
- 멤버 변수는 없고 오직 11개의 메서드만이 있다.

| 메서드                         | 설명                                                                            |
|--------------------------------|----------------------------------------------------------------------------------|
| protected Object clone()       | 객체 자신의 복사본을 반환                                                        |
| public void equals(Object obj) | 객체 자신과 객체 obj가 같은 객체인지 알려준다.(같으면 true)                      |
| protected void finalize()      | 객체가 소멸될 때 가비지 컬렉터에 의해 자동적으로 호출된다. 오버라이딩 필요 (거의 사용안함) |
| public Class getClass()        | 객체 자신의 클래스 정보를 담고 있는 Class 인스턴스 반환                         |
| public int hashCode()          | 객체 자신의 해시코드 반환                                                        |
| public String toString()       | 객체 자신의 정보를 문자열로 반환                                                |
| public void notify()           | 객체 자신을 사용하려고 기다리는 쓰레드를 하나만 깨운다.                          |
| public void notifyAll()        | 객체 자신을 사용하려고 기다리는 모든 쓰레드를 깨운다.                            |
| public void wait()             | 다른 쓰레드나 notify() 혹은 notifyAll()을 호출할 때까지 현재 쓰레드를 무한히 대기 |
| public void wait(long timeout) | 쓰레드를 timeout까지 대기 (timeout은 1 / 1000초)                                |
| public void wait(long timeout, int nanos) | 쓰레드를 timeout + nanos까지 대기 (nanos는 1 / 10의 9승)             |

### equals

- 매개변수와 자신이 **동등**한지 비교하는 메서드
- 객체의 경우 생성될 때 빈 메모리에 생성되기 때문에 같은 주소를 갖는 일은 없다.(참조는 가능하다!)
- 오버라이딩하여 서로 다른 인스턴스의 멤버변수 값이 비교될 수 있게 하자.

### hashCode

- 해시함수를 구현한 것(주소값을 통해 생성)
- 32bit JVM에서는 중복된 해시코드값이 생성될 수 없지만 64bit JVM에서는 중복된 해시코드가 생성될 수 있다.(해시코드는 32bit를 통해서 만들어지는데 64bit에서 압축하거나 잘라서 사용할 경우 중복이 발생할 수 있다.)
- equals로 값을 비교하더라도 해시코드 값을 통해 동등성을 확인해야한다.(값만 같은 객체일 수 있다.)

### toString

- 인스턴스 정보를 문자열로 제공
- 오버라이딩하지 않을 경우 문자열로 16진수 해시코드가 출력
- 조상이 public이라 오버라이딩하더라도 무조건 public 이어야 한다.

### clone

- 자신을 복제하여 새로운 인스턴스를 생성
- 인스턴스의 변수값만 복사하기 때문에 참조타입의 변수가 있으면 완전 복제가 이루어지지 않는다.
- Cloneable 인터페이스를 구현해야 한다.
- 객체를 참조하는 객체를 clone할 경우 얕은 복사가 일어나 주의해야한다.(원본과 복사본이 동일한 객체를 참조)
- 깊은 복사를 하고 싶다면 복제 후 참조하는 객체 또한 복제해야한다.

### getClass

- 클래스의 모든 정보를 담고 있으며, 클래스 당 1개만 존재한다.
- 클래스 파일이 클래스 로더에 의해서 메모리에 올라갈 때 자동으로 생성된다.
- 클래스 로더는 기존에 생성된 클래스 객체가 메모리에 존재하는지 확인하고 있으면 객체의 참조를 반환하고 없으면 클래스 패스에 지정된 경로를 따라서 클래스 파일을 읽는다. 못찾으면 ClassNotFoundException이 발생하고 찾으면 클래스 파일을 읽어서 Class 객체로 변환한다. 즉 class 파일을 읽어서 class 객체를 생성한다.

## String 클래스

- char의 문자열을 제공하는 클래스

### 변경 불가능한(immutable) 클래스

- 한번 생성된 String인스턴스는 갖고 있는 문자열은 읽을 수만 있고 변경 불가능하다.
- '+'연산자를 통해 결합할 경우 기존 문자열이 바뀌는 것이 아니라 새로운 문자열이 담긴 인스턴스가 생성된다.
- 매 연산시 String 클래스가 생성되므로 결합이나 추출 등 관련 작업이 많을 경우 StringBuffer를 사용하는 것이 좋다.

### 문자열의 비교

```java
String a1 = "abc"; // 문자열 리터럴
String a2 = "abc"; // 문자열 리터럴
String a3 = new String("abc"); // 새로운 문자열
String a4 = new String("abc"); // 새로운 문자열
```

- 문자열은 리터럴과 String 클래스를 통해 만드는 방법이 있다.
- 리터럴은 기존에 생성된 문자열을 재사용하는 것으로 메모리할당이 일어나지 않고 String 클래스는 new 연산자에 의해 새로운 메모리가 할당된다.

#### 문자열 리터럴

- 자바 소스파일에 포함된 모든 문자열 리터럴은 컴파일 시 클래스 파일에 저장된다.
- 클래스 파일에는 소스파일에 포함된 모든 리터럴 목록이 있다. 해당 클래스 파일이 클래스 로더에 의해 메모리에 올라갈 때 이 리터럴 목록에 있는 리터럴들이 JVM 내에 있는 상수 저장소(constant pool)에 저장된다.

### 빈 문자열

- 길이가 0인 배열은 존재할 수 있다. char 배열의 길이가 0일 경우, 해당 배열이 나타내는 문자열은 바로 빈 문자열이다.
- 빈 문자열은 길이가 0인 문자열로, 이는 공백 문자나 null과는 다르다.
- 자바에서 빈 문자열은 String 클래스의 리터럴 값 ""로 표현된다.

#### null vs 빈 문자열

- null은 문자열이 존재하지 않음을 나타낸다.
- 빈 문자열은 문자열이 존재하지만, 길이가 0임을 나타낸다.
- 빈 문자열의 활용: 초기화 값으로 사용, 객체나 변수를 초기화할 때 빈 문자열을 사용하여 null 참조를 방지할 수 있다.(String.isEmpty())

## 메서드

### String replace(String s, String replacement)

- 지정된 문자열(`s`)에 일치하는 모든 문자열을 주어진 문자열(`replacement`)로 대체한다.

### String replaceAll(String regex, String replacement)

- 지정된 정규 표현식(`regex`)에 일치하는 모든 문자열을 주어진 문자열(`replacement`)로 대체한다. `replace`와 동일하지만 정규식이 아닌 경우에도 사용할 수 있다.

### String replaceFirst(String s, String replacement)

- 지정된 문자열(`s`)에 일치하는 첫 번째 문자열만 주어진 문자열(`replacement`)로 대체한다.

### String[] split(String s, int limit)

- 지정된 문자열(`s`)을 기준으로 문자열을 나누어 배열로 반환한다.
- `limit`이 0보다 크면 결과 배열의 크기가 최대 `limit`만큼 제한된다.

### boolean startsWith(String prefix)

- 문자열이 지정된 접두사(`prefix`)로 시작하는지 검사한다.

### String substring(int begin)

- 문자열에서 지정된 시작 위치(`begin`)부터 끝까지의 부분 문자열을 반환한다.

### String substring(int begin, int end)

- 문자열에서 지정된 시작 위치(`begin`)부터 종료 위치(`end`) 전까지의 부분 문자열을 반환한다.
- `end` 위치의 문자는 포함되지 않는다.

### char[] toCharArray()

- 문자열의 모든 문자를 `char` 배열로 반환한다.

### String toLowerCase()

- 문자열의 모든 문자를 소문자로 변환한 새 문자열을 반환한다.

### String toUpperCase()

- 문자열의 모든 문자를 대문자로 변환한 새 문자열을 반환한다.

### String trim()

- 문자열의 앞뒤 공백 문자를 제거한 새 문자열을 반환한다.

### boolean matches(String regex)

- 문자열이 지정된 정규 표현식(`regex`)과 일치하는지 확인한다.

### boolean isEmpty()

- 문자열의 길이가 0인지 확인한다. 빈 문자열일 경우 `true`를 반환한다.

### static String valueOf(Object obj)

- 지정된 객체를 문자열로 변환하여 반환한다. 객체가 `null`인 경우 `"null"` 문자열을 반환한다.

### int length()

- 문자열의 길이(문자의 개수)를 반환한다.
