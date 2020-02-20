import React, {
  lazy,
  Suspense,
  useMemo,
  useState,
  useEffect,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Loading from '@Components/Base/Loading';
import { delay } from '@Tools/utility';

const Components = {};

function Lazy(lazyProps) {
  const {
    componentImport,
    componentChunkName,
    componentProps,
  } = lazyProps;
  const [isRender, setIsRender] = useState(false);
  const RenderComponent = useMemo(() => {
    const Component = Components[componentChunkName];
    if (Component) {
      return (<Component {...componentProps} />);
    }
    return (<Loading typePosition="relative" typeBackground="white" isLoading typeZIndex={10005} />);
  }, [componentChunkName, isRender]);
  /* Hooks */
  useEffect(() => {
    (async () => {
      if (!Components[componentChunkName]) {
        await delay(500);
        Components[componentChunkName] = lazy(() => componentImport);
      }
      setIsRender(cloneDeep(!isRender));
    })();
  }, [componentChunkName]);
  return (
    <React.Fragment>
      <Suspense fallback={<Loading typePosition="relative" typeBackground="white" isLoading typeZIndex={10005} />}>
        {RenderComponent}
      </Suspense>
    </React.Fragment>
  );
}

export default Lazy;
