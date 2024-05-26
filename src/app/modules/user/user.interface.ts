export type TUser = {
  id: string;
  password: string;
  NeedPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDelete: boolean;
};
export type NewUsers={
  password:string,
  role:string,
  id:string
}