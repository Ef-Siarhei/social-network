import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status="I am hallow" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('I am hallow');
  });

  test('after creation <span> should be displayed with correct status', () => {
    const component = create(<ProfileStatus status="I am hallow" />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span).not.toBeNull();
  });
});
