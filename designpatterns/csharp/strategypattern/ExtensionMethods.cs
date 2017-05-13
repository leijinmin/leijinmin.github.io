using System.Collections.Generic;
using System.Linq;


namespace StrategyPattern
{
    /// <summary>
    /// The extension methods for all strategies
    /// </summary>
    static class ExtensionMethods
    {
        public static string SearchByName(this NameEmail[] nomCourriels, string champ)
        {
            return string.Join("", nomCourriels.Where(x => champ.ToLower().Equals(x.Name.ToLower()))
                                               .Select(x => string.Format("Nom: {0}\tCourriel: {1}\n", x.Name, x.Email)));

        }
        public static string SearchByEmail(this NameEmail[] nomCourriels, string champ)
        {
            return string.Join("", nomCourriels.Where(x => champ.ToLower().Equals(x.Email.ToLower()))
                                               .Select(x => string.Format("Nom: {0}\tCourriel: {1}\n", x.Name, x.Email)));
        }
        public static string ShowAll(this NameEmail[] nomCourriels)
        {
            return string.Join("", nomCourriels.Select(x => string.Format("Nom: {0}\tCourriel: {1}\n", x.Name, x.Email)));
        }
        public static string Sort(this NameEmail[] nomCourriels)
        {
            IEnumerable<NameEmail> resultat = nomCourriels.OrderBy(x => x.Name);
            return string.Join("", resultat.Select(x => string.Format("Nom: {0}\tCourriel: {1}\n", x.Name, x.Email)));
        }
    }
}
