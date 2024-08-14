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
    const span = () => root.findByType('span');
    expect(span).not.toBeNull();
  });

  test('after creation <input> should not be displayed', () => {
    const component = create(<ProfileStatus status="I am hallow" />);
    const root = component.root;
    const input = () => root.findByType('input');
  expect(input).toThrow();
  });

  test('after creation <span> should contains correct status', async () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    // findBy used with async await
    let span = await root.findByType('span')
    expect(span.children[0]).toBe("it-kamasutra");
  });

  test('input should be displayed in editMode instead of span', async () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    let span = await root.findByType('span');
    span.props.onDoubleClick();
    let input = await root.findByType('input');
    expect(input.props.value).toBe("it-kamasutra");
  });

  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="it-kamasutra" updateUserStatus={ mockCallback }/>);
    const instance = component.getInstance();
    instance.deactivateEditMode();
    // The mock function was called once (https://jestjs.io/ru/docs/mock-functions)
    expect(mockCallback.mock.calls).toHaveLength(1);
  });


});
