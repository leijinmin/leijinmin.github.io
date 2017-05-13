using System.Collections.Generic;

namespace StrategyPattern
{
    class QueueStrategy : AbstractStructureStrategy
    {
        private Queue<NameEmail> queue = new Queue<NameEmail>();

        public override void Add(string nom, string courriel)
        {
            queue.Enqueue(new NameEmail(nom, courriel));
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
            NameEmail[] nameEmails = new NameEmail[queue.Count];
            queue.CopyTo(nameEmails, 0);
            return nameEmails;
        }
        public override bool IsEmpty()
        {
            return queue.Count == 0;
        }
    }
}
