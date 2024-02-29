import * as React from 'react';
import axios from 'axios';
import FormContainer from '../FormContainer/FormContainer';
import { urlData } from '../../Interface/UrlData';
import { serverUrl } from '../../helpers/constant';
import DataTable from '../DataTable/DataTable';

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<urlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl`);
    setData(response.data);
    setReload(false);
  }

  const updateReload = ():void => {
    setReload(true);
  }

  React.useEffect(() => {
    fetchTableData();
  },[reload]);

  return (
    <>
        <FormContainer updateReload = {updateReload}/>
        <DataTable updateReload = {updateReload} data={data}/>
    </>
  );
};

export default Container;
