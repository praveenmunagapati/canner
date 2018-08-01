import ArrayPattern from '../../../src/action/pattern/arrayPattern';

const createAction = {
  type: 'CREATE_ARRAY',
  payload: {
    value: {
      title: '',
      info: {
        author: []
      }
    }
  }
}

const updateAction1 = {
  type: 'UPDATE_ARRAY',
  payload: {
    value: {
      title: 'title'
    }
  }
}

const updateAction2 = {
  type: 'UPDATE_ARRAY',
  payload: {
    value: {
      info: {
        author: []
      }
    }
  }
}

const deleteAction = {
  type: 'DELETE_ARRAY',
  payload: {
  }
}

describe('array pattern', () => {
  let arrayPattern;
  beforeEach(() => {
    arrayPattern = new ArrayPattern();
  });

  it('remove action if delete after create', () => {
    arrayPattern.addAction(createAction);
    arrayPattern.addAction(updateAction1);
    arrayPattern.addAction(updateAction2);
    arrayPattern.addAction(deleteAction);
    expect(arrayPattern.getActions().length).toBe(0);
  });

  it('remove update before delete', () => {
    arrayPattern.addAction(updateAction1);
    arrayPattern.addAction(updateAction2);
    arrayPattern.addAction(deleteAction);
    expect(arrayPattern.getActions().length).toBe(1);
    expect(arrayPattern.getActions()[0]).toEqual(deleteAction);
  });

  it('merge update', () => {
    arrayPattern.addAction(updateAction1);
    arrayPattern.addAction(updateAction2);
    expect(arrayPattern.getActions().length).toBe(1);
    expect(arrayPattern.getActions()[0].payload.value.toJS()).toEqual({
      info: {
        author: []
      },
      title: 'title'
    });
  });

  it('merge update and create', () => {
    arrayPattern.addAction(createAction);
    arrayPattern.addAction(updateAction1);
    arrayPattern.addAction(updateAction2);
    expect(arrayPattern.getActions().length).toBe(1);
    expect(arrayPattern.getActions()[0].type).toBe('CREATE_ARRAY');
    expect(arrayPattern.getActions()[0].payload.value.toJS()).toEqual({
      info: {
        author: []
      },
      title: 'title'
    });
  });
});
