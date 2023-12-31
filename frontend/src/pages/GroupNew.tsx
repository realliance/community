import { Button } from 'flowbite-react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { createNewGroup } from '../util/group';
import { TextInputWithLabel } from '../components/TextInputWithLabel';
import { Value } from '../util/events';

interface EventTargets {
  name: Value<string>;
}

export function GroupNew() {
  const { token, loading: contextLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contextLoading && !token) {
      navigate('/');
    }
  }, [navigate, contextLoading, token]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      setLoading(true);

      const eventTargets = e.target as unknown as EventTargets;
      const groupName = eventTargets.name.value;

      const group = await createNewGroup(token, groupName);

      if (group) {
        navigate(`/group/${group.id}`);
      }

      setLoading(false);
    }
  };

  return (
    <div className="container max-w-xl mx-auto flex flex-col gap-3">
      <h1 className="text-4xl font-bold">New Group</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
        <TextInputWithLabel id="name" name="Name" required />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </div>
  );
}
