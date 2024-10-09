import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import {
  getOrdersAll,
  getUserState
} from '../../services/slices/userSlice/userSlice';
import { getFeeds } from '../../services/slices/feedSlice/feedSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders, loginUserRequest } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, []);

  if (loginUserRequest) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
