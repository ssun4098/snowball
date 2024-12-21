# StringBuffer, Builder

## StringBuffer

- 내부적으로 버퍼를 가지고 있어 문자열 편집이 가능
- 선언할 때 충분히 길이의 버퍼를 잡아주는 것이 좋다.(초과될 경우 버퍼를 늘려주는 작업이 내부적으로 진행되기 때문)
- Compareable 인터페이스를 상속받았지만 오버라이딩을 하지 않아 equals를 할 때 유의해야한다.

```java
public StringBuffer() {
        super(16); // 기본값으로 16의 버퍼 크기를 가짐
    }

public StringBuffer(String str) {
        super(str); // str의 길이 + 16만큼 생성, 아래가 부모의 생성자다.
    }

        /**
     * Constructs an AbstractStringBuilder that contains the same characters
     * as the specified {@code String}. The initial capacity of
     * the string builder is {@code 16} plus the length of the
     * {@code String} argument.
     *
     * @param      str   the string to copy.
     */
    AbstractStringBuilder(String str) {
        int length = str.length();
        int capacity = (length < Integer.MAX_VALUE - 16)
                ? length + 16 : Integer.MAX_VALUE;
        final byte initCoder = str.coder();
        coder = initCoder;
        value = (initCoder == LATIN1)
                ? new byte[capacity] : StringUTF16.newBytesFor(capacity);
        append(str);
    }


    // StringBuffer의 append()
    public synchronized StringBuffer append(Object obj) {
        toStringCache = null;
        super.append(String.valueOf(obj));
        return this;
    }

    // 부모의 append()
        public AbstractStringBuilder append(String str) {
        if (str == null) {
            return appendNull();
        }
        int len = str.length();
        ensureCapacityInternal(count + len); // 버퍼의 길이 확장
        putStringAt(count, str); // 연결
        count += len;
        return this;
    }

        /**
     * For positive values of {@code minimumCapacity}, this method
     * behaves like {@code ensureCapacity}, however it is never
     * synchronized.
     * If {@code minimumCapacity} is non positive due to numeric
     * overflow, this method throws {@code OutOfMemoryError}.
     */
    private void ensureCapacityInternal(int minimumCapacity) {
        // overflow-conscious code
        int oldCapacity = value.length >> coder;
        if (minimumCapacity - oldCapacity > 0) {
            value = Arrays.copyOf(value,
                    newCapacity(minimumCapacity) << coder); // 배열을 생성
        }
    }

    // equals를 오버리아딩 하지 않았다는 javadoc 내용
    StringBuffer implements Comparable but does not override equals. Thus, the natural ordering of StringBuffer is inconsistent with equals. Care should be exercised if StringBuffer objects are used as keys in a SortedMap or elements in a SortedSet. See Comparable, SortedMap, or SortedSet for more information.
```

## StringBuilder

- StringBuffer에서 ```synchronized```만 제외한 클래스()
- StringBuffer와 같은 추상 클래스를 상속받고 있다.
- 멀티 쓰레드 환경이면 StringBuffer를 싱글 쓰레드면 StringBuilder를 사용
- Buffer와 마찬가지로 equals를 오버라이딩하지 않았다.

## 메서드(반환값은 StringBuffer로 통일해서 작성)

### int capacity()

- 버퍼의 크기를 알려준다.(문자열의 길이가 아니다.)

### char charAt(int index)

- 지정된 위치(index)의 문자열을 알려준다.

### StringBuffer delete(int start, int end)

- start <= 문자열 < end 범위의 문자열을 삭제한다.

### StringBuffer deleteChatAt(int index)

- 지정된 위치(index)의 문자를 제거한다.

### StringBuffer insert(int pos, Object o)

- 두번째 매개변수를 문자열로 변환 후 pos위치에 추가한다.(pos는 0기준)

### int length()

- 문자열의 길이를 반환

### StringBuffer replace(int start, int end, String str)

- 지정된 범위(start <= 문자열 < end)의 문자열을 str로 변환

### StringBuffer reverse()

- 문자열 뒤집기

### void setCharAt(int index, char ch)

- 지정된 위치(index)의 문자를 ch로 변환

### void setLength()

- 지정된 길이로 문자열의 길이를 변경

### String substring(int start)

- start부터 끝까지 문자열 반환(길이 0기준)

### String substring(int start, int end)

- start <= n < end 까지 문자열 반환