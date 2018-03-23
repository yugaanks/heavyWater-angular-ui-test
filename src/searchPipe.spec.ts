import { SearchPipe } from './app/shared/directive/search.pipe';
describe('SearchPipe', () => { 
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('filters items array by matching the search term for each respective key value', () => {
    let value: any = [{'LoanNumber': '2545', 'Borrower_LastName': 'Sharma'},{'LoanNumber': '5445', 'Borrower_LastName': 'Shinchan'}];
    let keys: string = 'LoanNumber,Borrower_LastName';
    let searchTerm: string = 'Shar'

    expect(pipe.transform(value, keys, searchTerm)).toEqual([{'LoanNumber': '2545', 'Borrower_LastName': 'Sharma'}])
  });

});