# @gdg/landing

## 0.1.0

### Minor Changes

- 33d8ac8: 프로젝트 트랙 상세 페이지(`/project-track`)를 추가했어요. 학기를 선택하면 총괄과 멘토, 프로젝트 목록, 코스별 활동을 확인할 수 있어요. 프로젝트에 대표 이미지와 저장소 링크가 등록되면 카드에서 확인할 수 있어요. 데이터를 불러오지 못하면 페이지에서 다시 시도할 수 있어요.

### Patch Changes

- b6ecf65: Endless Connections의 궤도 크기와 배치에 WOWDS 브레이크포인트를 적용해 소수점 너비에서도 구간이 끊기지 않도록 했어요. 타이포그래피 확인용 `/typo-test` 경로를 정리했어요.
- 3ddaeb4: 모집 안내 모달을 Esc로 닫고, Tab과 Shift+Tab으로 모달 안의 채널 링크를 탐색할 수 있어요. 모달을 닫으면 처음 열었던 버튼으로 포커스가 돌아오고, 스크린 리더에서 모달 제목을 확인할 수 있어요.
- Updated dependencies [b6ecf65]
  - @gdg/wowds@1.0.0
