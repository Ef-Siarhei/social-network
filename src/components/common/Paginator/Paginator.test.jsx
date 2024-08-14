import React from "react";
import {create} from "react-test-renderer";
import Paginator from "./Paginator";

describe('Paginator component test', () => {
  test('pages count is 11 but should be showed only 10', async () => {
    const component = create(<Paginator totalItemsCount={150} pageSize={10} />)
    const root = component.root;
    const spanAll = await root.findAllByType('span')
    expect(spanAll.length).toBe(10)
  })

  test('if pages count more then 10 button NEXT should be present', async () => {
    const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
    const root = component.root;
    const button = await root.findAllByType('button')
    expect(button.length).toBe(2)
  })
})
