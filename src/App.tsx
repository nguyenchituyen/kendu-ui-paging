import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Pager, PageChangeEvent } from '@progress/kendo-react-data-tools';
import { DemoConfigurator } from './configurator';
import { products } from './products';

const total = products.length;
const pageSizes = [5, 10, 20];

const initialType: any = 'numeric'

const initialPageState = {
    skip: 0,
    take: 5,
    buttonCount: 5,
    type: initialType,
    info: true,
    pageSizes: true,
    previousNext: true
};

const App = () => {

    const [pageState, setPageState] = React.useState(initialPageState);

    let { skip, take, ...rest } = pageState;

    React.useEffect(() => {
      const goToFirstPageNode = document.querySelector('.k-link.k-pager-nav.k-pager-first.k-state-disabled')
      const goToLastPageNode = document.querySelector('.k-link.k-pager-nav.k-pager-last')
      if(goToFirstPageNode?.parentNode) {
        goToFirstPageNode?.parentNode.removeChild(goToFirstPageNode)
      }
      if(goToLastPageNode?.parentNode) {
        goToLastPageNode?.parentNode.removeChild(goToLastPageNode)
      }

      const pagerNumberNode = document.querySelector('.k-pager-numbers.k-reset')
      const currentPage = pageState.skip/pageState.take + 1
      if(pagerNumberNode?.firstChild && pagerNumberNode?.firstChild.hasChildNodes()) {
        const href = pagerNumberNode.firstChild.childNodes[0] as HTMLHRElement
        if (href.innerText === '...') {
          // Insert goToFirstPageNode
          const li = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.classList.add('k-link', 'k-pager-first');
          anchor.title = "Go to the first page";
          anchor.href = '#';
          anchor.innerText = '1';
          anchor.onclick = () => {
            setPageState({ ...pageState, skip: 0, take: pageState.take })
          };
          li.appendChild(anchor);
          pagerNumberNode.insertBefore(li,pagerNumberNode.firstChild)
        } else if(href.innerText === '1') {
          const firstChild = pagerNumberNode.firstChild.childNodes[0] as HTMLElement
          if(firstChild.classList.value === "k-link k-pager-first" && currentPage <= pageState.buttonCount) {
            if(pagerNumberNode?.firstChild.parentNode) {
              pagerNumberNode?.firstChild?.parentNode.removeChild(pagerNumberNode?.firstChild)
            } 
          }
        }
      }
      
      const totalPages = Math.ceil(total/pageState.take)
      if(pagerNumberNode?.lastChild && pagerNumberNode?.lastChild.hasChildNodes()) {
        const href = pagerNumberNode.lastChild.childNodes[0] as HTMLHRElement
        if (href.innerText === '...') {
          // Insert goToLastPageNode
          const li = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.classList.add('k-link', 'k-pager-last');
          anchor.title = "Go to the last page";
          anchor.href = '#';
          anchor.innerText = totalPages.toString();
          anchor.onclick = () => {
            setPageState({ ...pageState, skip: (totalPages -1) * pageState.take, take: pageState.take })
          };
          li.appendChild(anchor);
          pagerNumberNode.appendChild(li)
        } else if(href.innerText === totalPages.toString() && totalPages- currentPage < pageState.buttonCount) {
          const lastNode = pagerNumberNode.querySelector('.k-link.k-pager-last')
          if(lastNode?.parentNode) {
            pagerNumberNode.removeChild(lastNode.parentNode)
          }
        }
      }
    }, [pageState.skip, pageState.take, pageState])

    const handlePageChange = (event: PageChangeEvent) => {
        const { skip, take } = event;
        setPageState({ ...pageState, skip: skip, take: take })
    };

    // console.log(products.slice(skip, skip + take));
    return (
      <React.Fragment>
        <DemoConfigurator
          onChange={(data : any) => setPageState({...pageState, ...data})}
          values={rest}
            />
        <Pager
          skip={skip}
          take={take}
          total={total}
          buttonCount={pageState.buttonCount}
          info={pageState.info}
          type={pageState.type}
          pageSizes={pageState.pageSizes ? pageSizes : undefined}
          previousNext={pageState.previousNext}
          onPageChange={handlePageChange}
            />
      </React.Fragment>
    );
}

export default App;
