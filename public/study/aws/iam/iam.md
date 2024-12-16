# IAM(Identity and Access Management)

- AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스
- AWS 전체의 권한 통제 시스템

## Account Owner ID (Root Account)

- 구독한 모든 서비스에 대한 접근 => *노출이 되면 위험하기 때문에 업무에 사용하지 않는 것을 권고*
- 과금 정보에 대한 접근
- 콘솔 및 API 사용
- 기술 지원 계약 변경

## IAM 사용자, 역할 Federated 사용자

- 지정된 일부 서비스에 대한 접근
- 콘솔 및 API 사용
- 기술지원 요청

## 어플리케이션을 위한 임시 보안 자격 증명

- 지정된 일부 서비스에 대한 접근
- 콘솔 및 API 사용

## IAM의 작동방식

![iam작동방식](/study/aws/iam/iam.png)

IAM은 아래의 순서로 작동한다.

1. 보안주체(Principal)
2. 인증(Authentication)
3. 요청(Request)
4. 인가(Authorization)
5. 작업 또는 연산(Action or Opertaion)
6. 리소스(Resource)

## 보안주체(Principal)

- 요청을 수행하는 엔터티로, 일반적으로 사용자, 애플리케이션, 또는 서비스이다.
- IAM을 통해 관리되는 ID(액세스 키 및 보안 액세스 키)와 자격 증명(역할)을 포함한다.

## 인증(Authentication)

- 인증은 보안 주체가 자신이 주장하는 신원을 증명하는 과정이다.
- 일반적으로 사용자 이름, 비밀번호, 또는 MFA(Multi-Factor Authentication) 같은 자격 증명을 통해 수행된다.

## 요청(Request)

- 요청은 보안 주체가 특정 리소스에 대해 수행하고자 하는 **작업이나 연산**을 말한다.
- 요청은 다음 정보를 포함한다:
  - 작업(Operation): 실행하려는 작업(예: 읽기, 쓰기, 삭제 등)
  - 리소스(Resource): 작업이 적용될 대상

## 인가(Authorization)

- 인가는 인증된 보안 주체가 요청한 작업을 수행할 권한이 있는지를 확인하는 과정이다.
- IAM 정책(Policy) 및 권한(Role)에 따라 결정된다.

## 작업 또는 연산(Action or Operation)

- 요청 엔터티가 요창한 작업 또는 연산을 **수행할 권한이 있는 경우** IAM은 요청을 진행하도록 허용한다.

## 리소스(Resource)

- 리소스는 보안 주체가 작업을 수행하려는 대상이다.
- 예: 파일, 데이터베이스, 네트워크 구성 요소 등
- 리소스는 고유한 ARN(Amazon Resource Name) 또는 특정 ID로 식별된다.

## IAM 구성요소

### Users

- AWS를 사용하는 개인이나 서비스
- 자격 증명(액세시 키, 비밀 액세스 키)
  - 비밀 엑세스 키는 생성 후 다시 확인할 수 없으므로 바로 다른 곳에 저장 필수

### Groups

- 다수의 사용자를 모아놓은 것으로 **동일한 권한을 부여받은 사용자들의 집합**

### Roles

- 특정 권한을 가진 사용자나 서비스 등을 **임시 권한 부여**
- 임시 자격 증명을 통해 권한이 부여되며 장기 자격 증명을 사용하지 않기 때문에 보안상 유용(기간제)

### Policy

- 권한을 정의하는 JSON 문서
- 특정 리소스에 대한 액세스를 허용 혹은 거부하는 규칙이 작성
- Users, Groups, Roles을 연결

#### Policy 구성요소

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::example-bucket"
    }
  ]
}
```

- Version
  - 정책 언어의 버전을 지정합니다.
  - 가장 일반적으로 사용되는 값은 "2012-10-17"이며, 정책 문서에서 기본적으로 사용됩니다.
- Effect
  - 허용(Allow) 또는 거부(Deny) 두 가지 값만 가질 수 있습니다.
  - 해당 명령문이 특정 작업을 허용할지 거부할지를 결정합니다.
- Action
  - 수행할 수 있는 작업을 정의합니다. 예시: "s3:GetObject"
  - 와일드카드(*)를 사용해 여러 작업을 한 번에 지정할 수 있습니다.
- Resource
  - 작업이 적용되는 특정 AWS 리소스를 지정합니다.
  - Amazon Resource Name(ARN)을 사용하여 리소스를 식별합니다.
  - 와일드카드를 사용해 여러 리소스를 지정할 수 있습니다
