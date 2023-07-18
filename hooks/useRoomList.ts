import { useContext } from 'react';
import { RoomListSetterContext, RoomListProps, RoomListStateContext } from '../context/RoomListProvider.tsx';

function useRoomList() {
  const setRoomListState = useContext(RoomListSetterContext);
  const roomListState = useContext(RoomListStateContext);

  //   if (!setRoomListState) {
  //     throw new Error('RoomListSetterContext is not properly initialized');
  //   }

  const setRoomListData = (data: RoomListProps) => {
    if (setRoomListState) {
      setRoomListState.setState((roomListData) => {
        return { ...roomListData, ...data };
      });
    }
  };

  // const getSignUpData = () => {
  //   if (setSignUpState) {
  //     return setSignUpState.state;
  //   }
  // };

  return { setRoomListData, roomListState };
}

export default useRoomList;
