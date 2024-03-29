import { useLoaderData } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Group, joinGroup } from '../util/api';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ReallianceProvider, useOIDCProvider } from '../util/oidc';

export function GroupShow() {
  const { token, profile } = useContext(AuthContext);
  const { beginFlow } = useOIDCProvider(ReallianceProvider);
  const group = useLoaderData() as Group;

  useEffect(() => {
    if (!group && !token) {
      beginFlow();
    }
  }, [group, token, beginFlow]);

  const joined = useMemo(
    () => group?.users?.some((user) => user.id === profile?.id),
    [group, profile],
  );

  const join = () => {
    if (token) {
      joinGroup(token, group.id);
    }
  };

  return (
    <div className="container max-w-xl mx-auto flex flex-col gap-3">
      <h1 className="text-4xl font-bold">{group?.name}</h1>
      <Button disabled={joined} onClick={join} outline>
        Join
      </Button>
    </div>
  );
}
