using System.Collections.Generic;


namespace StrategyPattern
{
    class StackStrategy : AbstractStructureStrategy
    {
        private Stack<NameEmail> stack = new Stack<NameEmail>();

        public override void Add(string name, string email)
        {
            stack.Push(new NameEmail(name, email));
        }
        public override string Sort()
        {
            return convertToArray().Sort();
        }
        public override string ShowAll()
        {
            return convertToArray().ShowAll();
        }
        public override string SearchByName(string field)
        {
            return convertToArray().SearchByName(field);
        }
        public override string SearchByEmail(string field)
        {
            
            return convertToArray().SearchByEmail(field);
        }
        /// <summary>
        /// Convert the structure to Array
        /// </summary>
        /// <returns>The array</returns>
        private NameEmail[] convertToArray()
        {
            NameEmail[] nameEmails = new NameEmail[stack.Count];
            stack.CopyTo(nameEmails, 0);
            return nameEmails;
        }
        public override bool IsEmpty()
        {
            return stack.Count == 0;
        }
    }
}
