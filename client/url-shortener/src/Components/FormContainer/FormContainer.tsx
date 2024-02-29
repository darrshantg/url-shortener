import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../helpers/constant';

interface IFormContainerProps {
    updateReload: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
    const {updateReload} = props;

    const [fullUrl, setFullUrl] = React.useState<string>("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post(`${serverUrl}/shortUrl`, {
                fullUrl: fullUrl
            });  
            setFullUrl("");
            updateReload();
        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className='container mx-auto p-2'>
        <div className='bg-banner my-8 rounded-xl bg-cover bg-center'>
            <div className='w-full h-full rounded-xl p-20 backdrop-brightness-50'> 
                <h2 className='text-white opacity-70 text-center text-4xl pb-4'>
                    URL Shortner
                </h2>
                <p className='text-white text-center pb-2 text-lg font-light'>
                    Paste your long url to shorten it.
                </p>
                <p className='text-white text-center pb-4 text-sm font-thin'>
                    Free tool to shorten your lengthy url and making your url easy to use
                </p>
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800'>
                                urlshortner.link /
                            </div>
                            <input type='text' placeholder='paste your link here' required className='block w-full p-4 ps-32 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500'
                                value={fullUrl}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullUrl(e.target.value)}
                            />   
                            <button type='submit' className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-800 rounded-lg border border-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300'>
                                Shorten URL
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default FormContainer;
