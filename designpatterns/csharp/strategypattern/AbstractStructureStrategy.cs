namespace StrategyPattern
{
    abstract public class AbstractStructureStrategy
    {
        abstract public void Add(string nom, string courriel);
        abstract public string Sort();
        abstract public string ShowAll();
        abstract public string SearchByName(string champ);
        abstract public string SearchByEmail(string champ);
        abstract public bool IsEmpty();
        public bool Contains(string nom, string courriel)
        {
            return SearchByName(nom) != "" || SearchByEmail(courriel) != "";
        }
}
}
