import React from 'react';
import {
  FlatProgressIndicator,
  FlatProgressStep,
} from '../FlatProgressIndicator';
import FlatProgressIndicatorSkeleton from '../FlatProgressIndicator/FlatProgressIndicator.Skeleton';
import { shallow, mount } from 'enzyme';
import { settings } from '@rocketsoftware/carbon-components';

const { prefix } = settings;

describe('FlatProgressIndicator', () => {
  describe('Renders as expected', () => {
    const progress = (
      <FlatProgressIndicator className="some-class" currentIndex={3}>
        <FlatProgressStep
          label="label"
          description="Step 1: Getting Started with Node.js"
        />
        <FlatProgressStep
          label="label"
          description="Step 2: Getting Started with Node.js"
        />
        <FlatProgressStep
          label="label"
          description="Step 3: Getting Started with Node.js"
        />
        <FlatProgressStep
          label="label"
          description="Step 4: Getting Started with Node.js"
        />
        <FlatProgressStep
          label="label"
          description="Step 5: Getting Started with Node.js"
        />
        <FlatProgressStep
          label="label"
          description="Step 6: Getting Started with Node.js"
        />
      </FlatProgressIndicator>
    );
    const list = shallow(progress);
    const mountedList = mount(progress);

    beforeEach(() => {
      mountedList.setProps({ currentIndex: 3 });
    });

    it('should be a ul element', () => {
      expect(list.find('ul').length).toEqual(1);
    });

    it('should render with the appropriate classes', () => {
      expect(list.hasClass(`${prefix}--flat-progress`)).toEqual(true);
      expect(list.hasClass('some-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(list.find(FlatProgressStep).length).toEqual(6);
    });

    it('should have the initial currentIndex from props', () => {
      expect(list.state().currentIndex).toEqual(3);
    });

    it('should update state when currentIndex is changed', () => {
      list.setProps({ currentIndex: 1 });
      expect(list.state().currentIndex).toEqual(1);
      list.setProps({ currentIndex: 0 });
      expect(list.state().currentIndex).toEqual(0);
    });

    it('should avoid updating state unless actual change in currentIndex is detected', () => {
      list.setProps({ currentIndex: 1 });
      list.setState({ currentIndex: 2 });
      list.setProps({ currentIndex: 1 });
      expect(list.state().currentIndex).toEqual(2);
    });

    it('should trigger onChange if clicked', () => {
      const mockOnChange = jest.fn();

      mountedList.setProps({ onChange: mockOnChange });
      mountedList
        .find(FlatProgressStep)
        .at(0)
        .find('[role="button"]')
        .simulate('click');
      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    describe('FlatProgressStep', () => {
      it('should render with correct base className', () => {
        expect(
          mountedList
            .find(FlatProgressStep)
            .at(0)
            .children()
            .hasClass(`${prefix}--flat-progress-step`)
        ).toEqual(true);
      });

      it('should render with a label', () => {
        expect(mountedList.find(FlatProgressStep).at(0).prop('label')).toEqual(
          'label'
        );
      });

      it('should render with a description', () => {
        expect(
          mountedList.find(FlatProgressStep).at(0).prop('description')
        ).toEqual('Step 1: Getting Started with Node.js');
      });

      it('should render description in <title> node', () => {
        expect(mountedList.find('FlatProgressStep title').at(0).text()).toEqual(
          'Step 1: Getting Started with Node.js'
        );
      });

      describe('current', () => {
        it('should render a current FlatProgressStep with correct className', () => {
          expect(
            mountedList
              .find(FlatProgressStep)
              .at(3)
              .children()
              .hasClass(`${prefix}--flat-progress-step--current`)
          ).toEqual(true);
        });

        it('should render a current FlatProgressStep with correct props', () => {
          expect(mountedList.find(FlatProgressStep).at(3).prop('current')).toBe(
            true
          );
        });
      });

      describe('complete', () => {
        it('should render any completed FlatProgressSteps with correct className', () => {
          expect(
            mountedList
              .find(FlatProgressStep)
              .at(0)
              .children()
              .hasClass(`${prefix}--flat-progress-step--complete`)
          ).toEqual(true);
        });
        it('should render any completed FlatProgressSteps with correct props', () => {
          expect(list.find(FlatProgressStep).at(0).prop('complete')).toBe(true);
        });
      });

      describe('incomplete', () => {
        it('should render any incompleted FlatProgressSteps with correct className', () => {
          expect(
            mountedList
              .find(FlatProgressStep)
              .at(5)
              .children()
              .hasClass(`${prefix}--flat-progress-step--incomplete`)
          ).toEqual(true);
        });
        it('should render any incompleted FlatProgressSteps with correct props', () => {
          expect(list.find(FlatProgressStep).at(5).prop('complete')).toBe(
            false
          );
        });

        it('should render any clickable FlatProgressSteps with correct classname', () => {
          mountedList.setProps({ onChange: jest.fn() });
          expect(
            mountedList.find(`.${prefix}--flat-progress-step-button`)
          ).toHaveLength(6); // one button for each div
          expect(
            mountedList.find(
              `.${prefix}--flat-progress-step-button--unclickable`
            )
          ).toHaveLength(1); // only the current step should be unclickable
        });
      });
    });
  });
});

describe('FlatProgressIndicatorSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<FlatProgressIndicatorSkeleton />);

    it('Has the expected classes', () => {
      expect(wrapper.hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.hasClass(`${prefix}--flat-progress`)).toEqual(true);
    });
  });
});
